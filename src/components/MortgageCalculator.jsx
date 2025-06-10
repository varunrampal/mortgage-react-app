import React, { useState } from "react";
import jsPDF from "jspdf";
import {autoTable} from "jspdf-autotable";
import "../mortgagecalculator.css"; 

function MortgageCalculator() {
    const [principal, setPrincipal] = useState(300000);
    const [interestRate, setInterestRate] = useState(3.5);
    const [years, setYears] = useState(30);
    const [taxRate, setTaxRate] = useState(1.2); // %
    const [insuranceAnnual, setInsuranceAnnual] = useState(1200); // $

    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPaid, setTotalPaid] = useState(null);
    const [schedule, setSchedule] = useState([]);

    const calculate = () => {
        const loanAmount = parseFloat(principal);
        const monthlyInterest = parseFloat(interestRate) / 100 / 12;
        const numberOfPayments = parseInt(years) * 12;

        const baseMonthly =
            (loanAmount * monthlyInterest) /
            (1 - Math.pow(1 + monthlyInterest, -numberOfPayments));

        const monthlyTax = (loanAmount * (parseFloat(taxRate) / 100)) / 12;
        const monthlyInsurance = parseFloat(insuranceAnnual) / 12;

        const totalMonthly = baseMonthly + monthlyTax + monthlyInsurance;
        const totalPaidAll = totalMonthly * numberOfPayments;

        setMonthlyPayment(totalMonthly.toFixed(2));
        setTotalPaid(totalPaidAll.toFixed(2));

        // Amortization schedule calculation
        let balance = loanAmount;
        const scheduleArr = [];

        for (let i = 1; i <= numberOfPayments; i++) {
            const interest = balance * monthlyInterest;
            const principalPayment = baseMonthly - interest;
            balance -= principalPayment;

            scheduleArr.push({
                month: i,
                payment: totalMonthly.toFixed(2),
                principal: principalPayment.toFixed(2),
                interest: interest.toFixed(2),
                balance: balance > 0 ? balance.toFixed(2) : "0.00",
            });
        }

        setSchedule(scheduleArr);
    };

    const exportPDF = () => {
        const doc = new jsPDF();

        // Logo
        const logoUrl = "http://localhost:5173//logo-main-transparent.png";
        doc.addImage(logoUrl, "PNG", 14, 10, 40, 20);

        // Summary section
        doc.setFontSize(14);
        doc.text("Amortization Summary", 14, 50);

        const summary = [
            ["Loan Amount", `$${Number(principal).toLocaleString()}`],
            ["Interest Rate", `${interestRate}%`],
            ["Term", `${years} years`],
            ["Monthly Payment", `$${monthlyPayment}`],
            ["Total Paid", `$${totalPaid}`],
        ];

        summary.forEach(([label, value], index) => {
            doc.setFontSize(11);
            doc.text(`${label}:`, 14, 60 + index * 7);
            doc.text(`${value}`, 70, 60 + index * 7);
        });

        // Amortization table
        const tableData = schedule.map((row) => [
            row.month,
            `$${row.payment}`,
            `$${row.principal}`,
            `$${row.interest}`,
            `$${row.balance}`,
        ]);

        autoTable(doc,{
            startY: 90,
            head: [["Month", "Payment", "Principal", "Interest", "Balance"]],
            body: tableData,
            theme: "striped",
            headStyles: { fillColor: [0, 145, 224] },
            styles: { fontSize: 9 },
            margin: { top: 10 },
        });

        doc.save("Amortization-Schedule.pdf");
    };

    return (
        <>

            <div class="container">
                <div class="session-title row">
                    <h2>Mortgage Calculator</h2>
                    <p>Quickly See What Your Mortgage Payments Might Look Like</p>
                </div>
                <div class="heading-line"></div>
                    <div className="mortgage-container">

                <div className="form-group">
                    <label>Loan Amount ($)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Interest Rate (%)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Term (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Property Tax Rate (% of home value annually)</label>
                    <input
                        type="number"
                        step="0.1"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Home Insurance (Annual $)</label>
                    <input
                        type="number"
                        value={insuranceAnnual}
                        onChange={(e) => setInsuranceAnnual(e.target.value)}
                    />
                </div>

                <button onClick={calculate}>Calculate</button>

                {monthlyPayment && (
                    <>
                        <div className="results">
                                                        
                            <p>
                                💸 Total Monthly Payment: <strong>${monthlyPayment}</strong>
                            </p>
                            <p>
                                📈 Total Paid Over {years} Years: <strong>${totalPaid}</strong>
                            </p>
                        </div>

                        <div className="schedule-table">
                            <h3>Amortization Schedule</h3>
                            <div
                                style={{
                                    maxHeight: "300px",
                                    overflowY: "auto",
                                    border: "1px solid #ccc",
                                    marginTop: "1rem",
                                }}
                            >
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Month</th>
                                            <th>Payment</th>
                                            <th>Principal</th>
                                            <th>Interest</th>
                                            <th>Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schedule.map((row) => (
                                            <tr key={row.month}>
                                                <td>{row.month}</td>
                                                <td>${row.payment}</td>
                                                <td>${row.principal}</td>
                                                <td>${row.interest}</td>
                                                <td>${row.balance}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <button onClick={exportPDF} style={{ marginTop: "1rem" }}>
                            📄 Export Schedule as PDF
                        </button>
                    </>
                )}
            </div>
            </div>
        
        </>
    );
}

export default MortgageCalculator;
