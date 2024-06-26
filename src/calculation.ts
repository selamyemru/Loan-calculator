  
export function calculateMonthlyPayment(
  loanAmount: number,
  interestRate: number,
  loanTermInYears: number,
  loanTermType: string
) {
  const totalPayments = loanTermType === 'year' ? loanTermInYears * 12 : loanTermInYears;
  const monthlyInterestRate = interestRate / 100 / 12;

  if (interestRate === 0) {
    return Math.round(loanAmount / totalPayments);
  }

  const monthlyPayment = Math.round(
    loanAmount * monthlyInterestRate / (1 - Math.pow(1 + monthlyInterestRate, -totalPayments))
  );

  return monthlyPayment;
}

export function calculateAmortizationSchedule(
  loanAmount: number,
  interestRate: number,
  loanTermInYears: number,
  loanTermType: string,
  date: Date | null
) {
  const totalPayments = loanTermType === 'year' ? loanTermInYears * 12 : loanTermInYears;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermInYears, loanTermType);
  const amortizationSchedule = [];
  let remainingPrincipal = loanAmount;

  for (let month = 1; month <= totalPayments; month++) {
    const interestPaid = Math.round(remainingPrincipal * interestRate / 100 / 12);
    const principalPaid = Math.round(monthlyPayment - interestPaid);
    remainingPrincipal -= principalPaid;

    if (month === totalPayments) {
      remainingPrincipal = 0;
    }

    amortizationSchedule.push({
      date,
      month,
      principalPaid,
      interestPaid,
      remainingPrincipal: Math.round(remainingPrincipal),
      monthlyPayment,
    });
  }
  return amortizationSchedule;
}
export function calculateAnnualInterest(
  loanAmount: number,
  interestRate: number,
  loanTermInYears: number,
  loanTermType: string
): number[] {
  const totalPayments = loanTermType === 'year' ? loanTermInYears * 12 : loanTermInYears;
  const schedule = calculateAmortizationSchedule(loanAmount, interestRate, loanTermInYears, loanTermType, null);
  const annualInterest: number[] = [];

  if (loanTermType === 'year') {
    for (let year = 0; year < loanTermInYears; year++) {
      const yearInterest = schedule
        .slice(year * 12, (year + 1) * 12)
        .reduce((sum, payment) => sum + payment.interestPaid, 0);
      annualInterest.push(yearInterest);
    }
  } else {
    for (let month = 0; month < loanTermInYears; month++) {
      const monthInterest = schedule[month].interestPaid;
      annualInterest.push(monthInterest);
    }
  }

  return annualInterest;
}

export function calculateAnnualPrincipal(
  loanAmount: number,
  interestRate: number,
  loanTermInYears: number,
  loanTermType: string
): number[] {
  const totalPayments = loanTermType === 'year' ? loanTermInYears * 12 : loanTermInYears;
  const schedule = calculateAmortizationSchedule(loanAmount, interestRate, loanTermInYears, loanTermType, null);
  const annualPrincipal: number[] = [];

  if (loanTermType === 'year') {
    for (let year = 0; year < loanTermInYears; year++) {
      const yearPrincipal = schedule
        .slice(year * 12, (year + 1) * 12)
        .reduce((sum, payment) => sum + payment.principalPaid, 0);
      annualPrincipal.push(yearPrincipal);
    }
  } else {
    for (let month = 0; month < loanTermInYears; month++) {
      const monthPrincipal = schedule[month].principalPaid;
      annualPrincipal.push(monthPrincipal);
    }
  }

  return annualPrincipal;
}


export function calculateAnnualPayment(
  loanAmount: number,
  interestRate: number,
  loanTermInYears: number,
  loanTermType: string
): number[] {
  const monthlyPayment = calculateMonthlyPayment(loanAmount, interestRate, loanTermInYears, loanTermType);
  const annualPayment = loanTermType === 'year' ? monthlyPayment * 12 : monthlyPayment;

  const arrayLength = loanTermType === 'year' ? loanTermInYears : loanTermInYears * 12;

  if (arrayLength <= 0) {
    throw new RangeError("Invalid loan term length");
  }

  return new Array(arrayLength).fill(annualPayment);
}


export function calculateTotalInterest(
  monthlyPayment: number,
  loanTerm: number,
  loanAmount: number,
  loanTermType: string
) {
  const totalPayments = loanTermType === 'year' ? loanTerm * 12 : loanTerm;
  const interestAmount = (monthlyPayment * totalPayments - loanAmount);
  return interestAmount;
}

export function calculateTotalAmountPaid(loanAmount: number, interestAmount: number) {
  return (interestAmount + loanAmount);
}
