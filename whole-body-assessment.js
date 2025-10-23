//transfer to assessments

// مدیریت انتخاب روش
document.querySelectorAll(".method-select-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const selectedMethod = this.dataset.method;
    
    // هایلایت کارت انتخاب شده
    document.querySelectorAll(".method-card").forEach((card) => {
      card.classList.remove("selected");
    });
    this.closest(".method-card").classList.add("selected");
    
    // ذخیره اطلاعات روش انتخاب شده در localStorage
    localStorage.setItem(
      "selectedAssessmentMethod",
      JSON.stringify({
        method: selectedMethod,
        type: getMethodType(selectedMethod),
        details: getMethodDetails(selectedMethod),
        timestamp: new Date().toISOString()
      })
    );
    
    // هدایت به صفحه مربوطه
    redirectToAssessmentPage(selectedMethod);
  });
});

// مدیریت دکمه بازگشت
document.getElementById("back-btn").addEventListener("click", () => {
  window.history.back();
});

// تابع هدایت به صفحه ارزیابی مربوطه
function redirectToAssessmentPage(method) {
  const pages = {
    'rula': 'rula-assessment.html',
    'reba': 'reba-assessment.html',
    'owas': 'owas-assessment.html',
    'wera': 'wera-assessment.html'
  };
  
  if (pages[method]) {
    window.location.href = pages[method];
  } else {
    alert('خطا در انتخاب روش ارزیابی');
    console.error('روش ارزیابی نامعتبر:', method);
  }
}

// توابع کمکی
function getMethodType(method) {
  const types = {
    owas: "کلی بدن",
    wera: "کلی بدن",
    rula: "مجزای سمت‌ها",
    reba: "مجزای سمت‌ها",
  };
  return types[method] || "";
}

function getMethodDetails(method) {
  const details = {
    owas: {
      name: "OWAS",
      fullName: "Ovako Working Posture Analysis System",
      standard: "ISO 11226",
      bodyParts: "تمام بدن",
      description: "ارزیابی پوسچرهای کاری در 4 سطح"
    },
    wera: {
      name: "WERA",
      fullName: "Whole-Body Ergonomic Risk Assessment",
      standard: "EN 1005",
      bodyParts: "ترکیب عوامل",
      description: "ارزیابی ریسک ارگونومیک کل بدن"
    },
    rula: {
      name: "RULA",
      fullName: "Rapid Upper Limb Assessment",
      standard: "ISO 11226",
      bodyParts: "اندام فوقانی",
      description: "ارزیابی سریع اندام فوقانی"
    },
    reba: {
      name: "REBA",
      fullName: "Rapid Entire Body Assessment",
      standard: "ISO 11226",
      bodyParts: "تمام بدن",
      description: "ارزیابی سریع تمام بدن"
    },
  };
  return details[method] || {};

}
