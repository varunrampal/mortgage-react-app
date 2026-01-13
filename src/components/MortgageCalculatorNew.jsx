import React, { useState, useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import html2canvas from "html2canvas";
import "../mortgagecalculator.css";
import AmortizationChart from '../components/AmortizationChart.jsx';

export default function MortgageCalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTerm, setLoanTerm] = useState(25);
    const [frequency, setFrequency] = useState('Monthly');
    const [payment, setPayment] = useState(null);
    const [totalPaid, setTotalPaid] = useState(null);
    const [schedule, setSchedule] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);


    const chartRef = useRef();

    const toggleSection = () => {
  setIsExpanded((prev) => !prev);
};
useEffect(() => {
  if (isExpanded) {
    document.getElementById("amortization-section")?.scrollIntoView({ behavior: "smooth" });
  }
}, [isExpanded]);
    const calculateMortgage = () => {
        const principal = parseFloat(loanAmount) - (parseFloat(downPayment) || 0);
        const rate = parseFloat(interestRate) / 100;
        const paymentsPerYear = frequency === 'Monthly' ? 12 : 26;

        if (principal > 0 && rate && loanTerm && paymentsPerYear) {
            const periodicRate = rate / paymentsPerYear;
            const totalPayments = loanTerm * paymentsPerYear;
            const factor = Math.pow(1 + periodicRate, totalPayments);
            const periodicPayment = (principal * factor * periodicRate) / (factor - 1);
            const fixedPayment = parseFloat(periodicPayment.toFixed(2));

            setPayment(fixedPayment.toFixed(2));
            setTotalPaid((fixedPayment * totalPayments).toFixed(2));

            // Amortization schedule
            let balance = principal;
            const amortization = [];

            for (let i = 1; i <= totalPayments; i++) {
                const interestPayment = balance * periodicRate;
                const principalPayment = fixedPayment - interestPayment;
                balance -= principalPayment;

                amortization.push({
                    paymentNumber: i,
                    interestPaid: interestPayment.toFixed(2),
                    principalPaid: principalPayment.toFixed(2),
                    remainingBalance: balance > 0 ? balance.toFixed(2) : '0.00',
                });

                if (balance <= 0) break;
            }

            setSchedule(amortization);
        } else {
            setPayment(null);
            setTotalPaid(null);
            setSchedule([]);
        }
    };

    const downloadPDF = async () => {
        const doc = new jsPDF();

        const logoUrl = "https://themortgages.net//logo-main-transparent.png";
        doc.addImage(logoUrl, "PNG", 14, 10, 40, 20);


        doc.setFontSize(18);
        doc.text('Mortgage Summary', 14, 50);

        doc.setFontSize(14);
        doc.text(`Loan Amount: $${loanAmount}`, 14, 60);
        doc.text(`Down Payment: $${downPayment || '0'}`, 14, 70);
        doc.text(`Interest Rate: ${interestRate}%`, 14, 80);
        doc.text(`Amortization Period: ${loanTerm} years`, 14, 90);
        doc.text(`Payment Frequency: ${frequency}`, 14, 100);
        doc.text(`Payment: $${payment}`, 14, 110);
        doc.text(`Total Paid: $${totalPaid}`, 14, 120);

        // Add amortization chart image
        // if (chartRef.current) {
        //     const canvas = await html2canvas(chartRef.current);
        //     const imgData = canvas.toDataURL("image/png");
        //     doc.addImage(imgData, "PNG", 14, 130, 180, 90); // adjust height/width if needed
        // }

        // Amortization Table
        autoTable(doc, {
            startY: 125,
            head: [['#', 'Interest', 'Principal', 'Remaining Balance']],
            body: schedule.map((row) => [
                row.paymentNumber,
                `$${row.interestPaid}`,
                `$${row.principalPaid}`,
                `$${row.remainingBalance}`,
            ]),
            styles: { fontSize: 9 },
            headStyles: { fillColor: [0, 145, 224] },
        });

        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(10);
        doc.setTextColor(120);

        doc.text('Gaurav Sharma | 2961 Townline Rd, Abbotsford, BC, Canada', 14, pageHeight - 20);
        doc.text('Email: sgavin.sharma@ymscanada.ca | Phone: 1-604-217-2992', 14, pageHeight - 14);

        doc.save('Mortgage_Amortization_Schedule.pdf');
    };

    return (
        <>
            <div class="container">
                <div class="session-title row">
                    <h2>Mortgage Payment Calculator</h2>
                    <p>Quickly See What Your Mortgage Payments Might Look Like</p>
                </div>
                <div class="heading-line"></div>

            </div>

            <div id="calculator" className="mortgage-container">

                <div className="form-group">
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Down Payment ($) - optional</label>
                    <input
                        type="number"
                        value={downPayment}
                        onChange={(e) => setDownPayment(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Interest Rate (%)</label>
                    <input
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    />
                </div>

                <div className="amortizationControl">
                    <label >Amortization Period: {loanTerm} Years</label>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                    />
                </div>

                <div className="paymentFrequencyControl">
                    <label>Payment Frequency</label>
                    <select
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                    >
                        <option value="Monthly">Monthly</option>
                        <option value="Bi-Monthly">Bi-Monthly</option>
                    </select>
                </div>

                <button onClick={calculateMortgage} style={{ marginTop: '40px' }}>
                    Calculate
                </button>

                {payment && (
                    <div className="results" >
                        💸 <strong>{frequency} Payment: ${payment}</strong><br />
                        📈 <strong>Total Paid Over {loanTerm} Years: ${totalPaid}</strong>
                    </div>
                )}

                {schedule.length > 0 && (
                    <>
                        <div className="collapsible-section">
                            <button className="toggle-btn" onClick={toggleSection}>
                                {isExpanded ? "Amortization Details ▲" : "Amortization Details ▼"}
                            </button>

                            {isExpanded && (
                                <div className="collapsible-content">
                                       <div className="schedule-table" >
                            <h3>Amortization Schedule</h3>

                            <div
                                style={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    marginTop: "1rem",
                                }}
                            >

                                <table >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Interest</th>
                                            <th>Principal</th>
                                            <th>Remaining Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((row) => (
                                            <tr key={row.paymentNumber}>
                                                <td>{row.paymentNumber}</td>
                                                <td>${row.interestPaid}</td>
                                                <td>${row.principalPaid}</td>
                                                <td>${row.remainingBalance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div ref={chartRef}>  <AmortizationChart schedule={schedule} /></div>

                        <button onClick={downloadPDF} style={{ marginTop: '70px', marginLeft: '10px' }}>
                            Download as PDF
                        </button>
                                </div>
                            )}
                        </div>

                   

                    </>
                )}
            </div>

        </>
    );
}
