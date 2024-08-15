$(document).ready(function () {
  // Toggle menu and navbar on click
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  // Handle scroll and load events
  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    // Show or hide scroll top button
    if (window.scrollY > 60) {
      $("#scroll-top").addClass("active");
    } else {
      $("#scroll-top").removeClass("active");
    }

    // Scroll spy functionality
    $("section").each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr("id");

      if (top > offset && top < offset + height) {
        $(".navbar ul li a").removeClass("active");
        $(`.navbar [href="#${id}"]`).addClass("active");
      }
    });
  });

  // Smooth scrolling for anchor links
  $('a[href*="#"]').on("click", function (e) {
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      500,
      "linear"
    );
  });

  // EmailJS integration for contact form
  $("#contact-form").submit(function (event) {
    event.preventDefault(); // Prevent default form submission

    // Form validation
    var name = $("input[name='name']").val().trim();
    var email = $("input[name='email']").val().trim();
    var phone = $("input[name='phone']").val().trim();
    var message = $("textarea[name='message']").val().trim();

    var nameValid = name.length > 0;
    var emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    var phoneValid = /^[0-9]{10}$/.test(phone); // Adjust the regex as needed
    var messageValid = message.length > 0;

    if (!nameValid) {
      alert("Please enter your name.");
      return;
    }

    if (!emailValid) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneValid) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (!messageValid) {
      alert("Message is required.");
      return;
    }

    // Initialize EmailJS

    emailjs.init("zoGUv1FJBOfaKo79w"); // Replace with your actual user ID

    emailjs
      .sendForm("service_199upjf", "template_8yg0f1b", "#contact-form")
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          $("#contact-form")[0].reset(); // Clear form fields
          alert("Form Submitted Successfully");
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Form Submission Failed! Try Again");
        }
      );
  });

  // Change favicon and title on visibility change
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === "visible") {
      document.title = "Portfolio | Fazil Niyazdeen";
      $("#favicon").attr("href", "./images/favicon.png");
    } else {
      document.title = "Come Back To Portfolio";
      $("#favicon").attr("href", "./images/favhand.png");
    }
  });

  // Typed.js effect for typing animation
  var typed = new Typed(".typing-text", {
    strings: [
      "frontend development",
      "backend development",
      "web designing",
      "android development",
      "web development",
    ],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
  });
});
