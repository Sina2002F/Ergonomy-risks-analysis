document.addEventListener('DOMContentLoaded', function() {
  // دریافت دکمه شروع ارزیابی
  const startButton = document.getElementById('start-btn');
  
  if (startButton) {
    startButton.addEventListener('click', function() {
      // انتقال به صفحه question.html
      window.location.href = 'questions.html';
    });
  }
});



document.addEventListener('DOMContentLoaded', function() {
  const taskForm = document.getElementById('task-form');
  
  if (taskForm) {
    taskForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get the selected radio button's value
      const selectedTaskType = document.querySelector('input[name="task-type"]:checked');
      
      if (!selectedTaskType) {
        alert('لطفاً نوع وظیفه کاری را انتخاب کنید');
        return;
      }
      
      const taskType = selectedTaskType.value; // Get the value from the selected radio button
      
      // انتقال به صفحه مربوطه بر اساس انتخاب کاربر
      switch(taskType) {
        case 'MMH':
          window.location.href = 'mmh.html';
          break;
        case 'Non-MMH':
          window.location.href = 'non-mmh.html';
          break;
        case 'Special-Purpose':
          window.location.href = 'special-purpose.html';
          break;
        default:
          alert('خطا در انتخاب نوع وظیفه');
      }
    });
  }
});




// مدیریت فرم ارزیابی MMH
document.getElementById('mmh-assessment-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const purpose = document.getElementById('purpose').value;
  
  switch(purpose) {
    case 'max-weight':
      window.location.href = 'mmh-max-weight.html';
      break;
    case 'full-body':
      window.location.href = 'full-body-assessment.html';
      break;
    case 'screening':
      window.location.href = 'screening.html';
      break;
    default:
      alert('لطفاً یک گزینه را انتخاب کنید');
  }
});

// مدیریت فرم Non-MMH
document.getElementById('non-mmh-assessment-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const assessmentType = document.getElementById('assessment-type').value;
  
  switch(assessmentType) {
    case 'lower-limb':
      window.location.href = 'lower-limb-assessment.html';
      break;
    case 'upper-limb':
      window.location.href = 'upper-limb-assessment.html';
      break;
    case 'whole-body':
      window.location.href = 'whole-body-assessment.html';
      break;
    default:
      alert('لطفاً نوع ارزیابی را انتخاب کنید');
  }
});

// مدیریت فرم Special Purpose
document.getElementById('special-assessment-form')?.addEventListener('submit', function(e) {
  e.preventDefault();
  const jobType = document.getElementById('job-type').value;
  
  switch(jobType) {
    case 'agriculture':
      window.location.href = 'agriculture-assessment.html';
      break;
    case 'patient-handling':
      window.location.href = 'patient-handling-assessment.html';
      break;
    case 'assembly':
      window.location.href = 'assembly-assessment.html';
      break;
    case 'computer-work':
      window.location.href = 'computer-assessment.html';
      break;
    default:
      alert('لطفاً نوع شغل را انتخاب کنید');
  }
});


// فعال کردن دکمه ادامه وقتی یک گزینه انتخاب شد
const activityCards = document.querySelectorAll('.activity-card');
const continueBtn = document.getElementById('continue-btn');

activityCards.forEach(card => {
  card.addEventListener('click', function() {
    const input = this.querySelector('.activity-input');
    input.checked = true;
    
    activityCards.forEach(c => c.classList.remove('active'));
    this.classList.add('active');
    continueBtn.disabled = false;
  });
});

// ارسال فرم
document.getElementById('max-weight-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const selectedActivity = document.querySelector('input[name="activity-type"]:checked')?.value;
  
  if (!selectedActivity) {
    alert('لطفاً نوع فعالیت را انتخاب کنید');
    return;
  }

  switch(selectedActivity) {
    case 'pushing-pulling':
      window.location.href = 'pushing-pulling-assessment.html';
      break;
    case 'lifting':
      window.location.href = 'lifting-assessment.html';
      break;
    case 'carrying':
      window.location.href = 'carrying-assessment.html';
      break;
    default:
      alert('خطا در انتخاب فعالیت');
  }
});

// مدیریت انتخاب روش ارزیابی
document.querySelectorAll('.method-select-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const method = this.dataset.method;
    
    // ذخیره روش انتخاب شده
    localStorage.setItem('selectedMethod', JSON.stringify({
      activity: 'pushing-pulling',
      method: method,
      standards: getMethodStandards(method)
    }));
    
    // هدایت به صفحه ارزیابی
    window.location.href = `assessment-form.html?activity=pushing-pulling&method=${method}`;
  });
});

function getMethodStandards(method) {
  const standards = {
    'arbouw': ['Arbouw Guidelines'],
    'iso11228-2': ['ISO 11228-2'],
    'snook': ['SNOOK Tables']
  };
  return standards[method] || [];
}

// مدیریت انتخاب نوع بلند کردن
const liftingTypes = document.querySelectorAll('.lifting-type');

liftingTypes.forEach(type => {
  const buttons = type.querySelectorAll('.method-select-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function() {
      const method = this.dataset.method;
      const typeName = type.querySelector('h3').textContent;
      
      // ذخیره اطلاعات انتخاب
      localStorage.setItem('selectedLiftingMethod', JSON.stringify({
        liftingType: typeName,
        method: method,
        standards: getLiftingStandards(method)
      }));
      
      // هدایت به صفحه ارزیابی
      window.location.href = `assessment-form.html?type=lifting&method=${method}`;
    });
  });
});

function getLiftingStandards(method) {
  const standards = {
    'iso11228-1-living': ['ISO 11228-1'],
    'en1005-2-single': ['EN 1005-2'],
    'niosh-sli': ['NIOSH (SLI)'],
    'iso11228-1-twohand': ['ISO 11228-1'],
    'en1005-2-twohand': ['EN 1005-2'],
    'acgih': ['ACGIH'],
    'snook-twohand': ['SNOOK'],
    'wisha': ['WISHA'],
    'niosh-complex': ['NIOSH'],
    'wisha-complex': ['WISHA']
  };
  return standards[method] || [];
}

// مدیریت انتخاب روش برای جابجایی بار
document.querySelectorAll('.method-select-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const method = this.dataset.method;
    
    localStorage.setItem('selectedCarryingMethod', JSON.stringify({
      method: method,
      standards: getCarryingStandards(method)
    }));
    
    window.location.href = `assessment-form.html?activity=carrying&method=${method}`;
  });
});

function getCarryingStandards(method) {
  const standards = {
    'iso11228-1': ['ISO 11228-1'],
    'en1005-2': ['EN 1005-2'],
    'arbouw': ['Arbouw'],
    'snook': ['SNOOK']
  };
  return standards[method] || [];
}

// دریافت پارامترهای URL
const urlParams = new URLSearchParams(window.location.search);
const activity = urlParams.get('activity');
const method = urlParams.get('method');

// بارگذاری فرم ارزیابی مناسب
document.addEventListener('DOMContentLoaded', function() {
  if (activity && method) {
    loadAssessmentForm(activity, method);
  } else {
    alert('اطلاعات ارزیابی مشخص نشده است');
    window.location.href = 'index.html';
  }
});

function loadAssessmentForm(activity, method) {
  // نمایش اطلاعات انتخاب شده
  const selectionInfo = document.getElementById('selection-info');
  const savedData = JSON.parse(localStorage.getItem(`selected${capitalizeFirstLetter(activity)}Method`));
  
  if (savedData) {
    selectionInfo.innerHTML = `
      <h3>ارزیابی ${savedData.liftingType || activity}</h3>
      <p>روش انتخاب شده: <strong>${savedData.method}</strong></p>
      <p>استانداردها: ${savedData.standards.join(', ')}</p>
    `;
  }
  
  // بارگذاری فرم مناسب
  // (این بخش باید براساس نیازهای دقیق شما توسعه داده شود)
  const formContainer = document.getElementById('assessment-form-container');
  formContainer.innerHTML = `
    <h3>فرم ارزیابی ${method}</h3>
    <!-- محتوای فرم براساس روش انتخاب شده -->
  `;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// مدیریت انتخاب روش
      document.querySelectorAll('.method-select-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          const method = this.dataset.method;
          
          // ذخیره انتخاب کاربر
          localStorage.setItem('selectedFullBodyMethod', JSON.stringify({
            method: method,
            fullName: getMethodFullName(method),
            description: getMethodDescription(method)
          }));
          
          // هدایت به صفحه ارزیابی
          window.location.href = `${method}-assessment.html`;
        });
      });

      // توابع کمکی
      function getMethodFullName(method) {
        const names = {
          qec: 'Quick Exposure Check',
          owas: 'Ovako Working Posture Analysis System',
          wera: 'Whole-Body Ergonomic Risk Assessment'
        };
        return names[method] || '';
      }

      function getMethodDescription(method) {
        const descs = {
          qec: 'روش سریع ارزیابی مواجهه با عوامل خطر ارگونومیک',
          owas: 'سیستم تحلیل پوسچرهای کاری اووکو',
          wera: 'ارزیابی ریسک ارگونومیک کل بدن'
        };
        return descs[method] || '';
      }

      // در script.js صفحه اول MMH
document.getElementById('mmh-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const purpose = document.getElementById('purpose').value;
  
  if (purpose === 'full-body') {
    window.location.href = 'full-body-assessment.html';
  }
  // ... سایر موارد
});



      // در script.js صفحه اول MMH
document.getElementById('mmh-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const purpose = document.getElementById('purpose').value;
  
  if (purpose === 'screening') {
    window.location.href = 'screening.html';
  }
  // ... سایر موارد
});

// در فایل screening.html
document.getElementById('screening-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const selectedActivity = document.querySelector('input[name="screening-activity"]:checked')?.value;
  
  if (!selectedActivity) {
    alert('لطفاً نوع فعالیت را انتخاب کنید');
    return;
  }

  // هدایت به صفحه روش‌ها با پارامتر URL
  window.location.href = `screening-methods.html?activity=${selectedActivity}`;
});


// در script.js صفحه non-mmh-assessment.html
document.getElementById('non-mmh-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const assessmentType = document.getElementById('assessment-type').value;
  
  if (assessmentType === 'lower-limb') {
    window.location.href = 'lower-limb-assessment.html';
  }
  // ... سایر موارد
});

// در script.js صفحه non-mmh-assessment.html
document.getElementById('non-mmh-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const assessmentType = document.getElementById('assessment-type').value;
  
  if (assessmentType === 'upper-limb') {
    window.location.href = 'upper-limb-assessment.html';
  }
  // ... سایر موارد
});

// در script.js صفحه non-mmh-assessment.html
document.getElementById('non-mmh-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const assessmentType = document.getElementById('assessment-type').value;
  
  if (assessmentType === 'whole-body') {
    window.location.href = 'whole-body-assessment.html';
  }
  // ... سایر موارد
});

// در script.js صفحه special-assessment.html
document.getElementById('special-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const jobType = document.getElementById('job-type').value;
  
  if (jobType === 'agriculture') {
    window.location.href = 'agriculture-assessment.html';
  }
  // ... سایر موارد
});


// در script.js صفحه special-assessment.html
document.getElementById('special-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const jobType = document.getElementById('job-type').value;
  
  if (jobType === 'patient-handling') {
    window.location.href = 'patient-handling-assessment.html';
  }
  // ... سایر موارد
});


// در script.js صفحه special-assessment.html
document.getElementById('special-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const jobType = document.getElementById('job-type').value;
  
  if (jobType === 'assembly') {
    window.location.href = 'assembly-assessment.html';
  }
  // ... سایر موارد
});


// در script.js صفحه special-assessment.html
document.getElementById('special-assessment-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const jobType = document.getElementById('job-type').value;
  
  if (jobType === 'computer-work') {
    window.location.href = 'computer-assessment.html';
  }

});
