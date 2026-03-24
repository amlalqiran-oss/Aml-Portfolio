// 1. تعريف المتغيرات (مرة واحدة بس في أول الملف)
const hero = document.getElementById("hero");
const heroContent = document.querySelector(".hero-content");
const dynamicWord = document.getElementById("dynamic-word");
const words = ["craft", "design", "build"];
let wordIndex = 0;


// لو إحنا في صفحة المشاريع، اظهر كل حاجة فوراً
if (window.location.href.includes('projects.html')) {
    document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('active');
    });
}


// 2. وظيفة تبديل الكلمات
function changeWord() {
    dynamicWord.style.opacity = 0;
    setTimeout(() => {
        dynamicWord.textContent = words[wordIndex];
        dynamicWord.style.opacity = 1;
        wordIndex = (wordIndex + 1) % words.length;
    }, 500);
}
setInterval(changeWord, 3000);
changeWord();

// 3. وظيفة حركة الماوس (البارالاكس + الـ Glow الناعم)
document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    // حركة البارالاكس للمحتوى
    const mouseX = x / window.innerWidth - 0.5;
    const mouseY = y / window.innerHeight - 0.5;
    heroContent.style.transform = `translate(${mouseX * 30}px, ${mouseY * 30}px)`;

    // حركة النور (Glow) في الخلفية
    hero.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 179, 110, 0.08) 0%, transparent 60%)`;
});

// إعادة المحتوى لمكانه عند خروج الماوس
hero.addEventListener("mouseleave", () => {
    heroContent.style.transform = `translate(0px, 0px)`;
});

// وظيفة ظهور العناصر عند السكرول (Scroll Observer)
const observerOptions = {
    threshold: 0.2 // يبدأ يظهر لما 20% من السيكشن يبان
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// نطبق الحركة على العنوان والوصف
document.querySelectorAll('.reveal-text, .about-content').forEach((el) => {
    el.style.opacity = "0"; // نبدأ بـ مخفي
    el.style.transform = "translateY(30px)"; // نازل لتحت شوية
    el.style.transition = "all 1s ease-out"; // وقت الحركة
    observer.observe(el);
});

// كود الحركة الناعمة الإجباري
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, 1000); // 1000ms = ثانية واحدة للحركة
                window.scrollTo(0, run);
                if (timeElapsed < 1000) requestAnimationFrame(animation);
            }

            // معادلة النعومة (Ease-in-out)
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100; // مسافة الرؤية

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

// تشغيل الدالة مع السكرول
window.addEventListener("scroll", reveal);

// تشغيل الدالة فور تحميل الصفحة عشان العناصر اللي فوق تظهر
window.addEventListener("load", reveal);

// تأكيد التشغيل بعد نص ثانية احتياطي عشان الصور التقيلة
setTimeout(reveal, 500);


//  في صفحه ال see more ..دالة الإظهار اللي الزرار هينادي عليها
function showMoreProjects() {
    console.log("Button Clicked!"); // عشان نتأكد في الـ Console إن الزرار شغال
    
    // بنجيب كل الكروت اللي واخدة كلاس الاختفاء
    const hiddenCards = document.querySelectorAll('.hidden-card');
    
    hiddenCards.forEach(card => {
        // بنشيل كلاس الإخفاء ونخليه يظهر بـ Flex أو Block حسب تصميمك
        card.classList.remove('hidden-card');
        card.style.display = 'block'; 
        // بنشغل الأنيميشن لو موجود
        setTimeout(() => {
            card.classList.add('active');
        }, 10);
    });

    // نخفي الزرار بعد ما المهمة تخلص
    const btn = document.getElementById('loadMoreBtn');
    if (btn) btn.style.display = 'none';
}

// ربط الزرار بالدالة بطريقة مباشرة
window.onload = function() {
    const btn = document.getElementById('loadMoreBtn');
    if (btn) {
        btn.onclick = showMoreProjects;
    }
};