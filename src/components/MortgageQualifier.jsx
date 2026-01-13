import React, { useMemo, useState } from "react";

// ---------- Helpers ----------
const currency0 = (n) =>
  Number.isFinite(n)
    ? n.toLocaleString("en-CA", {
        style: "currency",
        currency: "CAD",
        maximumFractionDigits: 0,
      })
    : "-";

const percent1 = (n) => (Number.isFinite(n) ? (n * 100).toFixed(1) + "%" : "-");

function toNum(v) {
  const n = Number(String(v).replace(/[^\d.]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

function clamp(n, min = 0, max = Infinity) {
  return Math.min(Math.max(n, min), max);
}

function monthlyPayment(principal, annualRatePct, amortYears) {
  const r = (annualRatePct / 100) / 12;
  const n = Math.round(amortYears * 12);
  if (principal <= 0 || n <= 0) return 0;
  if (r === 0) return principal / n;
  const pow = Math.pow(1 + r, n);
  return principal * (r * pow) / (pow - 1);
}

// Canada stress test (uninsured): greater of contract + 2% OR 5.25%
function qualifyingRateCanada(contractRatePct) {
  return Math.max(contractRatePct + 2, 5.25);
}

function StackedBar({ mortgage, taxes, heating, condo }) {
  const parts = [
    { key: "mortgage", label: "Mortgage", value: mortgage },
    { key: "taxes", label: "Taxes", value: taxes},
    { key: "heating", label: "Heating", value: heating},
    { key: "condo", label: "Condo", value: condo },
  ].filter((p) => p.value > 0);

  const total = parts.reduce((s, p) => s + p.value, 0);
  if (!Number.isFinite(total) || total <= 0) return null;

  return (
    <div style={{ marginTop: 12 }}>
      <div className="stackedBar" aria-label="Monthly housing breakdown">
        {parts.map((p) => (
          <div
            key={p.key}
            className={`stackedSeg ${p.cls}`}
            style={{ width: `${(p.value / total) * 100}%` }}
            title={`${p.label}: ${currency0(p.value)}`}
          />
        ))}
      </div>

      <div className="stackLegend">
        {parts.map((p) => (
          <div className="legendItem" key={p.key}>
            <span className={`legendSwatch ${p.cls}`} />
            <span>{p.label}: </span>
            <b>{currency0(p.value)}</b>
          </div>
        ))}
      </div>

      <p style={{ color: "#fff", marginTop: 10, textAlign: "center" }}>
        Total housing costs: <b>{currency0(total)}</b> / month
      </p>
    </div>
  );
}

export default function MortgageQualifierCanadaStyled() {
  const [isAdvanced, setIsAdvanced] = useState(false);

  // Simple inputs
  const [incomeAnnual, setIncomeAnnual] = useState(120000);
  const [monthlyDebts, setMonthlyDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(100000);
  const [contractRate, setContractRate] = useState(5.5);

  // Slider amortization
  const [amortYears, setAmortYears] = useState(25);

  // Advanced housing costs
  const [propertyTaxMonthly, setPropertyTaxMonthly] = useState(350);
  const [heatingMonthly, setHeatingMonthly] = useState(120);
  const [condoFeesMonthly, setCondoFeesMonthly] = useState(0);

  // Advanced limits
  const [gdsMax, setGdsMax] = useState(0.39);
  const [tdsMax, setTdsMax] = useState(0.44);

  const results = useMemo(() => {
    const incAnnual = clamp(toNum(incomeAnnual), 0, 10_000_000);
    const incMonthly = incAnnual / 12;

    const debts = clamp(toNum(monthlyDebts), 0, 100_000);
    const down = clamp(toNum(downPayment), 0, 10_000_000);

    const contract = clamp(toNum(contractRate), 0, 50);
    const amort = clamp(toNum(amortYears), 1, 40);
    const qRate = qualifyingRateCanada(contract);

    const tax = isAdvanced ? clamp(toNum(propertyTaxMonthly)) : 0;
    const heat = isAdvanced ? clamp(toNum(heatingMonthly)) : 0;
    const condo = isAdvanced ? clamp(toNum(condoFeesMonthly)) : 0;

    const gdsLimit = isAdvanced ? clamp(toNum(gdsMax), 0, 1) : 0.39;
    const tdsLimit = isAdvanced ? clamp(toNum(tdsMax), 0, 1) : 0.44;

    if (incMonthly <= 0) {
      return { ok: false, qRate, reason: "Please enter your annual household income." };
    }

    const maxHousingByGDS = incMonthly * gdsLimit;
    const maxHousingByTDS = incMonthly * tdsLimit - debts;
    const maxHousing = Math.min(maxHousingByGDS, maxHousingByTDS);

    const maxMortgagePayment = maxHousing - (tax + heat + condo);
   

    if (maxMortgagePayment <= 0) {
      return {
        ok: false,
        qRate,
        reason: "Based on these inputs, there isn’t enough room within GDS/TDS limits for a mortgage payment.",
      };
    }

    // Solve for max mortgage principal (binary search)
    let lo = 0;
    let hi = 7_000_000;
    for (let i = 0; i < 45; i++) {
      const mid = (lo + hi) / 2;
      const pmt = monthlyPayment(mid, qRate, amort);
      if (pmt <= maxMortgagePayment) lo = mid;
      else hi = mid;
    }

    const maxMortgage = lo;
    const maxHomePrice = maxMortgage + down;

    const mortgagePmt = monthlyPayment(maxMortgage, qRate, amort);
    const housingCosts = mortgagePmt + tax + heat + condo;

    const gds = housingCosts / incMonthly;
    const tds = (housingCosts + debts) / incMonthly;

     const realMortgagePmt = monthlyPayment(maxMortgage, contract, amort);

     return {
      ok: true,
      qRate,
      incMonthly,
      debts,
      down,
      amort,
      maxMortgage,
      maxHomePrice,
      mortgagePmt,
       realMortgagePmt,
      tax,
      heat,
      condo,
      housingCosts,
      gds,
      tds,
      gdsLimit,
      tdsLimit,
    };
  }, [
    isAdvanced,
    incomeAnnual,
    monthlyDebts,
    downPayment,
    contractRate,
    amortYears,
    propertyTaxMonthly,
    heatingMonthly,
    condoFeesMonthly,
    gdsMax,
    tdsMax,
  ]);
    const closingRate = 0.03;
const estClosingCosts = results.maxHomePrice * closingRate;
const cashNeededAtClose = results.down + estClosingCosts; 
  return (
<>
      <div class="container">
                <div class="session-title row">
                    <h2>Mortgage Affordability Calculator</h2>
                    <p>Looking to buy a home? Enter a few basic details about your finances and our Mortgage Affordability Calculator will show the maximum monthly housing cost you can afford — including mortgage payment, property taxes, heating costs and more.</p>
                </div>
                <div class="heading-line"></div>

            </div>
    <div id="qualifier" className="mortgage-container">
   
      <div className="form-group">
        <label>Annual household income (gross)</label>
        <input
          type="number"
          value={incomeAnnual}
          onChange={(e) => setIncomeAnnual(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Monthly debt payments</label>
        <input
          type="number"
          value={monthlyDebts}
          onChange={(e) => setMonthlyDebts(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Down payment</label>
        <input
          type="number"
          value={downPayment}
          onChange={(e) => setDownPayment(e.target.value)}
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Interest rate (contract %)</label>
        <input
          type="number"
          step="0.01"
          value={contractRate}
          onChange={(e) => setContractRate(e.target.value)}
          min="0"
        />
      </div>

      <div className="amortizationControl">
        <label>
          Amortization: <b>{amortYears}</b> years
        </label>
        <input
          type="range"
          min="5"
          max="40"
          step="1"
          value={amortYears}
          onChange={(e) => setAmortYears(Number(e.target.value))}
        />
      </div>

      <div className="collapsible-section">
        <button
          type="button"
          className="toggle-btn"
          onClick={() => setIsAdvanced((v) => !v)}
        >
          {isAdvanced ? "Switch to Simple" : "Switch to Advanced"}
        </button>

        {isAdvanced && (
          <div style={{ marginTop: 12 }}>
            <div className="form-group">
              <label>Property taxes (monthly)</label>
              <input
                type="number"
                value={propertyTaxMonthly}
                onChange={(e) => setPropertyTaxMonthly(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Heating (monthly)</label>
              <input
                type="number"
                value={heatingMonthly}
                onChange={(e) => setHeatingMonthly(e.target.value)}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Condo fees (monthly)</label>
              <input
                type="number"
                value={condoFeesMonthly}
                onChange={(e) => setCondoFeesMonthly(e.target.value)}
                min="0"
              />
            </div>

            {/* <div className="form-group">
              <label>GDS max (default 0.39)</label>
              <input
                type="number"
                step="0.01"
                value={gdsMax}
                onChange={(e) => setGdsMax(e.target.value)}
                min="0"
                max="1"
              />
            </div>

            <div className="form-group">
              <label>TDS max (default 0.44)</label>
              <input
                type="number"
                step="0.01"
                value={tdsMax}
                onChange={(e) => setTdsMax(e.target.value)}
                min="0"
                max="1"
              />
            </div> */}
          </div>
        )}
      </div>
      <div className="results">
       

        {!results.ok ? (
          <p style={{ color: "#b00020" }}>{results.reason}</p>
        ) : (
          <>
           <p>
            <b>How much can I comfortably spend on my home purchase?</b>
        </p>
            <p>
              Max New home price (estimate): <b>{currency0(results.maxHomePrice)}</b>
            </p>
            <p>
              Max mortgage (estimate): <b>{currency0(results.maxMortgage)}</b>
            </p>
           
            {/* <p>
              Mortgage payment (qualifying): <b>{currency0(results.mortgagePmt)}</b>
            </p> */}

            <p>
               Mortgage payment (Monthly): <b>{currency0(results.realMortgagePmt)}</b>
          </p>
            {/* <p>
              GDS: <b>{percent1(results.gds)}</b> (limit {(results.gdsLimit * 100).toFixed(0)}%)
            </p>
            <p>
              TDS: <b>{percent1(results.tds)}</b> (limit {(results.tdsLimit * 100).toFixed(0)}%)
            </p> */}

            <p>
  Estimated closing costs (3%): <b>{currency0(estClosingCosts)}</b>
</p>
<p>
  Cash needed at closing: <b>{currency0(cashNeededAtClose)}</b>
</p>
             <p>
               Qualifying rate used: <b>{results.qRate?.toFixed?.(2)}%</b>
            </p>
          </>
        )}
      </div>

      {/* {results.ok && isAdvanced && (
        <div className="schedule-table">
          <h3>Monthly Housing Breakdown</h3>
          <StackedBar
            mortgage={results.mortgagePmt}
            taxes={results.tax}
            heating={results.heat}
            condo={results.condo}
          />
        </div>
      )} */}

      {/* {results.ok && isAdvanced && (
  <div className="schedule-table">
    <h3>Monthly Housing Breakdown (Real Payment)</h3>
    <StackedBar
      mortgage={results.realMortgagePmt}
      taxes={results.tax}
      heating={results.heat}
      condo={results.condo}
    />

    <h3 style={{ marginTop: 18 }}>Monthly Housing Breakdown (Qualifying / Stress Test)</h3>
    <StackedBar
      mortgage={results.mortgagePmt}
      taxes={results.tax}
      heating={results.heat}
      condo={results.condo}
    />
  </div>
)} */}
    </div>
    </>
  );
}
