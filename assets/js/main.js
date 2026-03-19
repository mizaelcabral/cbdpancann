(function ($) {
  "use strict";
  /*=================================
      JS Index Here
  ==================================*/
  /*
    01. On Load Function
    02. Preloader
    03. Mobile Menu Active
    04. Sticky fix
    05. Scroll To Top
    06. Set Background Image
    07. Hero Slider Active 
    08. Global Slider
    09. Ajax Contact Form
    10. Popup Side Menu   
    11. Magnific Popup
    12. Filter
    14. One Page Nav
    14. WOW.js Animation
    15. Indicator Position
    16. Color Plate Js
    17. Countdown Js
    18. Counter Animation
    19. Slider Range
    20. Nice Select
    21. Quantity ADD + Remove
    22. Woocommerce Toggle
    23. Magic Hover Active & Remove
    24. Popup Sidemenu
    25. Popup SideCart
    26. Search Box Popup
  */
  /*=================================
      JS Index End
  ==================================*/
  /*

  /*---------- 01. On Load Function ----------*/
  $(window).on("load", function () {
    $(".preloader").fadeOut();
  });

  /*---------- 02. Preloader ----------*/
  if ($(".preloader").length > 0) {
    $(".preloaderCls").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $(".preloader").css("display", "none");
      });
    });
  }

  /*---------- 03. Mobile Menu Active ----------*/
  $.fn.vsmobilemenu = function (options) {
    var opt = $.extend(
      {
        menuToggleBtn: ".vs-menu-toggle",
        bodyToggleClass: "vs-body-visible",
        subMenuClass: "vs-submenu",
        subMenuParent: "vs-item-has-children",
        subMenuParentToggle: "vs-active",
        meanExpandClass: "vs-mean-expand",
        appendElement: '<span class="vs-mean-expand"></span>',
        subMenuToggleClass: "vs-open",
        toggleSpeed: 400,
      },
      options
    );

    return this.each(function () {
      var menu = $(this); // Select menu

      // Menu Show & Hide
      function menuToggle() {
        menu.toggleClass(opt.bodyToggleClass);

        // collapse submenu on menu hide or show
        var subMenu = "." + opt.subMenuClass;
        $(subMenu).each(function () {
          if ($(this).hasClass(opt.subMenuToggleClass)) {
            $(this).removeClass(opt.subMenuToggleClass);
            $(this).css("display", "none");
            $(this).parent().removeClass(opt.subMenuParentToggle);
          }
        });
      }

      // Class Set Up for every submenu
      menu.find("li").each(function () {
        var submenu = $(this).find("ul");
        submenu.addClass(opt.subMenuClass);
        submenu.css("display", "none");
        submenu.parent().addClass(opt.subMenuParent);
        submenu.prev("a").append(opt.appendElement);
        submenu.next("a").append(opt.appendElement);
      });

      // Toggle Submenu
      function toggleDropDown($element) {
        if ($($element).next("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).next("ul").slideToggle(opt.toggleSpeed);
          $($element).next("ul").toggleClass(opt.subMenuToggleClass);
        } else if ($($element).prev("ul").length > 0) {
          $($element).parent().toggleClass(opt.subMenuParentToggle);
          $($element).prev("ul").slideToggle(opt.toggleSpeed);
          $($element).prev("ul").toggleClass(opt.subMenuToggleClass);
        }
      }

      // Submenu toggle Button
      var expandToggler = "." + opt.meanExpandClass;
      $(expandToggler).each(function () {
        $(this).on("click", function (e) {
          e.preventDefault();
          toggleDropDown($(this).parent());
        });
      });

      // Menu Show & Hide On Toggle Btn click
      $(opt.menuToggleBtn).each(function () {
        $(this).on("click", function () {
          menuToggle();
        });
      });

      // Hide Menu On out side click
      menu.on("click", function (e) {
        e.stopPropagation();
        menuToggle();
      });

      // Stop Hide full menu on menu click
      menu.find("div").on("click", function (e) {
        e.stopPropagation();
      });
    });
  };

  $(".vs-menu-wrapper").vsmobilemenu();

  /*---------- 04. Sticky fix ----------*/
  var lastScrollTop = "";
  var scrollToTopBtn = ".scrollToTop";

  function stickyMenu($targetMenu, $toggleClass, $parentClass) {
    var st = $(window).scrollTop();
    var height = $targetMenu.css("height");
    $targetMenu.parent().css("min-height", height);
    if ($(window).scrollTop() > 800) {
      $targetMenu.parent().addClass($parentClass);

      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.parent().css("min-height", "").removeClass($parentClass);
      $targetMenu.removeClass($toggleClass);
    }
    lastScrollTop = st;
  }
  $(window).on("scroll", function () {
    stickyMenu($(".sticky-active"), "active", "will-sticky");
    if ($(this).scrollTop() > 500) {
      $(scrollToTopBtn).addClass("show");
    } else {
      $(scrollToTopBtn).removeClass("show");
    }
  });

  /*---------- 05. Scroll To Top ----------*/
  $(scrollToTopBtn).each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      console.log("scroll to top clicked");
      $("html, body").animate(
        {
          scrollTop: 0,
        },
        1000
      );
      return false;
    });
  });

  /*---------- 06.Set Background Image ----------*/
  if ($("[data-bg-src]").length > 0) {
    $("[data-bg-src]").each(function () {
      var src = $(this).attr("data-bg-src");
      $(this).css("background-image", "url(" + src + ")");
      $(this).removeAttr("data-bg-src").addClass("background-image");
    });
  }

  /*----------- 07. Global Slider ----------*/
  $(".vs-carousel").each(function () {
    var asSlide = $(this);

    // Collect Data
    function d(data) {
      return asSlide.data(data);
    }

    // Custom Arrow Button
    var prevButton =
        '<button type="button" class="slick-prev"><i class="' +
        d("prev-arrow") +
        '"></i></button>',
      nextButton =
        '<button type="button" class="slick-next"><i class="' +
        d("next-arrow") +
        '"></i></button>';

    // Function For Custom Arrow Btn
    $("[data-slick-next]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-next")).slick("slickNext");
      });
    });

    $("[data-slick-prev]").each(function () {
      $(this).on("click", function (e) {
        e.preventDefault();
        $($(this).data("slick-prev")).slick("slickPrev");
      });
    });

    // Check for arrow wrapper
    if (d("arrows") == true) {
      if (!asSlide.closest(".arrow-wrap").length) {
        asSlide.closest(".container").parent().addClass("arrow-wrap");
      }
    }

    asSlide.slick({
      dots: d("dots") ? true : false,
      fade: d("fade") ? true : false,
      arrows: d("arrows") ? true : false,
      speed: d("speed") ? d("speed") : 1000,
      asNavFor: d("asnavfor") ? d("asnavfor") : false,
      autoplay: d("autoplay") == false ? false : false,
      infinite: d("infinite") == false ? false : true,
      slidesToShow: d("slide-show") ? d("slide-show") : 1,
      adaptiveHeight: d("adaptive-height") ? true : false,
      centerMode: d("center-mode") ? true : false,
      autoplaySpeed: d("autoplay-speed") ? d("autoplay-speed") : 8000,
      centerPadding: d("center-padding") ? d("center-padding") : "0",
      focusOnSelect: d("focuson-select") == false ? false : true,
      pauseOnFocus: d("pauseon-focus") ? true : false,
      pauseOnHover: d("pauseon-hover") ? true : false,
      variableWidth: d("variable-width") ? true : false,
      vertical: d("vertical") ? true : false,
      verticalSwiping: d("vertical") ? true : false,
      prevArrow: d("prev-arrow")
        ? prevButton
        : '<button type="button" class="slick-prev"><i class="far fa-chevron-left"></i></button>',
      nextArrow: d("next-arrow")
        ? nextButton
        : '<button type="button" class="slick-next"><i class="far fa-chevron-right"></i></button>',
      rtl: $("html").attr("dir") == "rtl" ? true : false,
      responsive: [
        {
          breakpoint: 1600,
          settings: {
            arrows: d("xl-arrows") ? true : false,
            dots: d("xl-dots") ? true : false,
            slidesToShow: d("xl-slide-show")
              ? d("xl-slide-show")
              : d("slide-show"),
            centerMode: d("xl-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1400,
          settings: {
            arrows: d("ml-arrows") ? true : false,
            dots: d("ml-dots") ? true : false,
            slidesToShow: d("ml-slide-show")
              ? d("ml-slide-show")
              : d("slide-show"),
            centerMode: d("ml-center-mode") ? true : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 1200,
          settings: {
            arrows: d("lg-arrows") ? true : false,
            dots: d("lg-dots") ? true : false,
            slidesToShow: d("lg-slide-show")
              ? d("lg-slide-show")
              : d("slide-show"),
            centerMode: d("lg-center-mode") ? d("lg-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 992,
          settings: {
            arrows: d("md-arrows") ? true : false,
            dots: d("md-dots") ? true : false,
            slidesToShow: d("md-slide-show") ? d("md-slide-show") : 1,
            centerMode: d("md-center-mode") ? d("md-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 767,
          settings: {
            arrows: d("sm-arrows") ? true : false,
            dots: d("sm-dots") ? true : false,
            slidesToShow: d("sm-slide-show") ? d("sm-slide-show") : 1,
            centerMode: d("sm-center-mode") ? d("sm-center-mode") : false,
            centerPadding: 0,
          },
        },
        {
          breakpoint: 576,
          settings: {
            arrows: d("xs-arrows") ? true : false,
            dots: d("xs-dots") ? true : false,
            slidesToShow: d("xs-slide-show") ? d("xs-slide-show") : 1,
            centerMode: d("xs-center-mode") ? d("xs-center-mode") : false,
            centerPadding: 0,
            vertical: d("sm-vertical") ? true : false,
          },
        },
      ],
    });
  });

  $(".vs-carousel").on("afterChange", function (event, slick, currentSlide) {
    $('input[type="radio"]').each(function () {
      $(this).prop("checked", $(this).data("checked"));
    });
  });

  $('input[type="radio"]').on("change", function () {
    $('input[type="radio"]').each(function () {
      $(this).data("checked", this.checked);
    });
  });

  /*----------- 08. Custom Tab  ----------*/
  $.fn.vsTab = function (options) {
    var opt = $.extend(
      {
        sliderTab: false,
        tabButton: "button",
        indicator: false,
      },
      options
    );

    $(this).each(function () {
      var $menu = $(this);
      var $button = $menu.find(opt.tabButton);

      // On Click Button Class Remove and indecator postion set
      $button.on("click", function (e) {
        e.preventDefault();
        var cBtn = $(this);
        cBtn.addClass("active").siblings().removeClass("active");
        if (opt.sliderTab) {
          $(slider).slick("slickGoTo", cBtn.data("slide-go-to"));
        }
      });

      // Work With slider
      if (opt.sliderTab) {
        var slider = $menu.data("asnavfor"); // select slider

        // Select All button and set attribute
        var i = 0;
        $button.each(function () {
          var slideBtn = $(this);
          slideBtn.attr("data-slide-go-to", i);
          i++;

          // Active Slide On load > Actived Button
          if (slideBtn.hasClass("active")) {
            $(slider).slick("slickGoTo", slideBtn.data("slide-go-to"));
          }

          // Change Indicator On slide Change
          $(slider).on(
            "beforeChange",
            function (event, slick, currentSlide, nextSlide) {
              $menu
                .find(opt.tabButton + '[data-slide-go-to="' + nextSlide + '"]')
                .addClass("active")
                .siblings()
                .removeClass("active");
            }
          );
        });
      }
    });
  };

  // Call On Load
  if ($(".vs-slider-tab").length) {
    $(".vs-slider-tab").vsTab({
      sliderTab: true,
      tabButton: ".tab-btn",
    });
  }

  /*----------- 09. Ajax Contact Form ----------*/
  function ajaxContactForm(selectForm) {
    var form = selectForm;
    var invalidCls = "is-invalid";
    var $email = '[name="email"]';
    var $validation =
      '[name="name"],[name="email"],[name="phone"],[name="message"]'; // Remove [name="subject"]
    var formMessages = $(selectForm).next(".form-messages");

    function sendContact() {
      var formData = $(form).serialize();
      var valid;
      valid = validateContact();
      if (valid) {
        jQuery
          .ajax({
            url: $(form).attr("action"),
            data: formData,
            type: "POST",
          })
          .done(function (response) {
            // Make sure that the formMessages div has the 'success' class.
            formMessages.removeClass("error");
            formMessages.addClass("success");
            // Set the message text.
            formMessages.text(response);
            // Clear the form.
            $(form + ' input:not([type="submit"]),' + form + " textarea").val(
              ""
            );
          })
          .fail(function (data) {
            // Make sure that the formMessages div has the 'error' class.
            formMessages.removeClass("success");
            formMessages.addClass("error");
            // Set the message text.
            if (data.responseText !== "") {
              formMessages.html(data.responseText);
            } else {
              formMessages.html(
                "Oops! An error occurred and your message could not be sent."
              );
            }
          });
      }
    }

    function validateContact() {
      var valid = true;
      var formInput;
      function unvalid($validation) {
        $validation = $validation.split(",");
        for (var i = 0; i < $validation.length; i++) {
          formInput = form + " " + $validation[i];
          if (!$(formInput).val()) {
            $(formInput).addClass(invalidCls);
            valid = false;
          } else {
            $(formInput).removeClass(invalidCls);
            valid = true;
          }
        }
      }
      unvalid($validation);

      if (
        !$(form + " " + $email).val() ||
        !$(form + " " + $email)
          .val()
          .match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)
      ) {
        $(form + " " + $email).addClass(invalidCls);
        valid = false;
      } else {
        $(form + " " + $email).removeClass(invalidCls);
        valid = true;
      }
      return valid;
    }

    $(form).on("submit", function (element) {
      element.preventDefault();
      sendContact();
    });
  }
  ajaxContactForm(".ajax-contact");
  
  /*----------- 09a. Ajax Newsletter Form ----------*/
  function ajaxNewsletterForm(selectForm) {
    $(document).on("submit", selectForm, function (e) {
      e.preventDefault();
      var form = $(this);
      var formData = form.serialize();
      var formMessages = form.find(".form-messages");
      var invalidCls = "is-invalid";
      var emailField = form.find('[name="email"]');
      var emailVal = emailField.val();

      if (!emailVal || !emailVal.match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        emailField.addClass(invalidCls);
        return false;
      } else {
        emailField.removeClass(invalidCls);
      }

      jQuery.ajax({
        url: form.attr("action"),
        data: formData,
        type: "POST",
      })
      .done(function (response) {
        formMessages.removeClass("error").addClass("success").text(response);
        emailField.val("");
      })
      .fail(function (data) {
        formMessages.removeClass("success").addClass("error");
        // If status is 200 but it failed, or if it hit a static server
        if (data.status === 200 || (data.status === 405 && form.attr("action").endsWith(".php"))) {
          formMessages.html("Nota: Esta funcionalidade exige um servidor PHP. O e-mail foi capturado mas não pôde ser enviado localmente.");
        } else if (data.responseText !== "") {
          formMessages.html(data.responseText);
        } else {
          formMessages.html("Ops! Ocorreu um erro. Tente novamente.");
        }
      });
    });
  }
  ajaxNewsletterForm(".ajax-newsletter");

  /*----------- 10. Magnific Popup ----------*/
  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*---------- 11. Section Position ----------*/
  // Interger Converter
  function convertInteger(str) {
    return parseInt(str, 10);
  }

  $.fn.sectionPosition = function (mainAttr, posAttr, getPosValue) {
    $(this).each(function () {
      var section = $(this);

      function setPosition() {
        var sectionHeight = Math.floor(section.height() / 2), // Main Height of section
          posValue = convertInteger(section.attr(getPosValue)), // positioning value
          posData = section.attr(mainAttr), // how much to position
          posFor = section.attr(posAttr), // On Which section is for positioning
          parentPT = convertInteger($(posFor).css("padding-top")), // Default Padding of  parent
          parentPB = convertInteger($(posFor).css("padding-bottom")); // Default Padding of  parent

        if (posData === "top-half") {
          $(posFor).css("padding-bottom", parentPB + sectionHeight + "px");
          section.css("margin-top", "-" + sectionHeight + "px");
        } else if (posData === "bottom-half") {
          $(posFor).css("padding-top", parentPT + sectionHeight + "px");
          section.css("margin-bottom", "-" + sectionHeight + "px");
        } else if (posData === "top") {
          $(posFor).css("padding-bottom", parentPB + posValue + "px");
          section.css("margin-top", "-" + posValue + "px");
        } else if (posData === "bottom") {
          $(posFor).css("padding-top", parentPT + posValue + "px");
          section.css("margin-bottom", "-" + posValue + "px");
        }
      }
      setPosition(); // Set Padding On Load
    });
  };

  var postionHandler = "[data-sec-pos]";
  if ($(postionHandler).length) {
    $(postionHandler).imagesLoaded(function () {
      $(postionHandler).sectionPosition(
        "data-sec-pos",
        "data-pos-for",
        "data-pos-amount"
      );
    });
  }

  /*----------- 12. Filter ----------*/
  $(".filter-active, .filter-active2").imagesLoaded(function () {
    var $filter = ".filter-active",
      $filter2 = ".filter-active2",
      $filterItem = ".filter-item",
      $filterMenu = ".filter-menu-active";

    if ($($filter).length > 0) {
      var $grid = $($filter).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: 1,
        },
      });
    }

    if ($($filter2).length > 0) {
      var $grid = $($filter2).isotope({
        itemSelector: $filterItem,
        filter: "*",
        masonry: {
          // use outer width of grid-sizer for columnWidth
          columnWidth: $filterItem,
        },
      });
    }

    // Menu Active Class
    $($filterMenu).on("click", "button", function (event) {
      event.preventDefault();
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({
        filter: filterValue,
      });
      $(this).addClass("active");
      $(this).siblings(".active").removeClass("active");
    });
  });

  /*----------- 13. One Page Nav ----------*/
  function onePageNav(element) {
    if ($(element).length > 0) {
      $(element).each(function () {
        $(this)
          .find("a")
          .each(function () {
            $(this).on("click", function (e) {
              var target = $(this.getAttribute("href"));
              if (target.length) {
                e.preventDefault();
                event.preventDefault();
                $("html, body")
                  .stop()
                  .animate(
                    {
                      scrollTop: target.offset().top - 10,
                    },
                    1000
                  );
              }
            });
          });
      });
    }
  }
  onePageNav(".onepage-nav, .main-menu, .vs-mobile-menu");

  /*----------- 14. WOW.js Animation ----------*/
  var wow = new WOW({
    boxClass: "wow", // animated element css class (default is wow)
    animateClass: "wow-animated", // animation css class (default is animated)
    offset: 0, // distance to the element when triggering the animation (default is 0)
    mobile: false, // trigger animations on mobile devices (default is true)
    live: true, // act on asynchronously loaded content (default is true)
    scrollContainer: null, // optional scroll container selector, otherwise use window,
    resetAnimation: false, // reset animation on end (default is true)
  });
  wow.init();

  /*----------- 15. Indicator Position ----------*/
  function setPos(element) {
    var indicator = element.siblings(".indicator"),
      btnWidth = element.css("width"),
      btnHiehgt = element.css("height"),
      btnLeft = element.position().left,
      btnTop = element.position().top;
    element.addClass("active").siblings().removeClass("active");
    indicator.css({
      left: btnLeft + "px",
      top: btnTop + "px",
      width: btnWidth,
      height: btnHiehgt,
    });
  }

  $(".login-tab a").each(function () {
    var link = $(this);
    if (link.hasClass("active")) setPos(link);
    link.on("mouseover", function () {
      setPos($(this));
    });
  });

  /*----------- 16. Color Plate Js ----------*/
  if ($(".vs-color-plate").length) {
    var oldValue = $("#plate-color").val();
    $("#plate-color").on("change", function (e) {
      var color = e.target.value;
      $("body").css("--theme-color", color);
    });

    $("#plate-reset").on("click", function () {
      $("body").css("--theme-color", "");
      $("#plate-color").val(oldValue);
    });

    $("#plate-toggler").on("click", function () {
      $(".vs-color-plate").toggleClass("open");
    });
  }

  /*----------- 17. Countdown Js ----------*/
  $.fn.countdown = function () {
    return this.each(function () {
      var $this = $(this),
        // Evergreen timer: 3 days from the current moment
        offerDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);

      function findElement(selector) {
        return $this.find(selector);
      }

      var interval = setInterval(function () {
        var now = new Date().getTime(),
          timeDiff = offerDate - now,
          days = Math.floor(timeDiff / 864e5),
          hours = Math.floor((timeDiff % 864e5) / 36e5),
          minutes = Math.floor((timeDiff % 36e5) / 6e4),
          seconds = Math.floor((timeDiff % 6e4) / 1e3);

        days < 10 && (days = "0" + days),
          hours < 10 && (hours = "0" + hours),
          minutes < 10 && (minutes = "0" + minutes),
          seconds < 10 && (seconds = "0" + seconds);

        if (timeDiff < 0) {
          clearInterval(interval);
          $this.addClass("expired");
          findElement(".message").css("display", "block");
        } else {
          findElement(".day").html(days);
          findElement(".hour").html(hours);
          findElement(".minute").html(minutes);
          findElement(".seconds").html(seconds);
        }
      }, 1000);
    });
  };

  $(".offer-counter").length && $(".offer-counter").countdown();

  /*----------- 18. Counter Animation ----------*/
  function animateCounter(counter) {
    const targetValue = parseInt(counter.getAttribute("data-counter"));
    const animationDuration = 1000; // Set the desired animation duration in milliseconds
    const startTimestamp = performance.now();

    function updateCounter(timestamp) {
      const elapsed = timestamp - startTimestamp;
      const progress = Math.min(elapsed / animationDuration, 1);

      const currentValue = Math.floor(targetValue * progress);
      counter.textContent = currentValue;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    }

    requestAnimationFrame(updateCounter);
  }

  function startCounterAnimation(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counter = entry.target.querySelector(".counter-media__number");
        animateCounter(counter);
        // observer.unobserve(entry.target);
      }
    });
  }

  const counterObserver = new IntersectionObserver(startCounterAnimation, {
    rootMargin: "0px",
    threshold: 0.2, // Adjust the threshold value as needed (0.2 means 20% visibility)
  });

  const counterBlocks = document.querySelectorAll(".counter-media");
  counterBlocks.forEach((counterBlock) => {
    counterObserver.observe(counterBlock);
  });

  /*----------- 19. Slider Range ----------*/
  $(function () {
    $("#slider-range-min").slider({
      range: "min",
      value: 250,
      min: 1,
      max: 700,
      slide: function (event, ui) {
        $("#amount").val(ui.value + " / Feet");
      },
    });
    $("#amount").val($("#slider-range-min").slider("value") + " / Feet");
  });
  $(function () {
    $("#slider-range-min2").slider({
      range: "min",
      value: 100,
      min: 1,
      max: 700,
      slide: function (event, ui) {
        $("#amount2").val(ui.value + " / KG");
      },
    });
    $("#amount2").val($("#slider-range-min2").slider("value") + " / KG");
  });

  /*----------- 20. Nice Select ----------*/
  if ($("select").length > 0) {
    $("select").niceSelect();
  }

  /*----------- 21. Quantity ADD + Remove ----------*/
  $(".quantity-plus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).closest(".quantity-container").find(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(formatNumber(currentVal + 1));
      }
    });
  });

  $(".quantity-minus").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      var $qty = $(this).closest(".quantity-container").find(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(formatNumber(currentVal - 1));
      }
    });
  });

  // Function to format the number with leading zeros
  function formatNumber(num) {
    return num.toString().padStart(2, "0");
  }

  /*----------- 22. Woocommerce Toggle ----------*/
  // Ship To Different Address
  $("#ship-to-different-address-checkbox").on("change", function () {
    if ($(this).is(":checked")) {
      $("#ship-to-different-address").next(".shipping_address").slideDown();
    } else {
      $("#ship-to-different-address").next(".shipping_address").slideUp();
    }
  });

  // Login Toggle
  $(".woocommerce-form-login-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-login").slideToggle();
  });

  // Coupon Toggle
  $(".woocommerce-form-coupon-toggle a").on("click", function (e) {
    e.preventDefault();
    $(".woocommerce-form-coupon").slideToggle();
  });

  // Woocommerce Shipping Method
  $(".shipping-calculator-button").on("click", function (e) {
    e.preventDefault();
    $(this).next(".shipping-calculator-form").slideToggle();
  });

  // Woocommerce Payment Toggle
  $('.wc_payment_methods input[type="radio"]:checked')
    .siblings(".payment_box")
    .show();
  $('.wc_payment_methods input[type="radio"]').each(function () {
    $(this).on("change", function () {
      $(".payment_box").slideUp();
      $(this).siblings(".payment_box").slideDown();
    });
  });

  // Woocommerce Rating Toggle
  $(".rating-select .stars a").each(function () {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(this).siblings().removeClass("active");
      $(this).parent().parent().addClass("selected");
      $(this).addClass("active");
    });
  });

  const links = document.querySelectorAll("a.event");
  if (links) {
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
      });
    });
  }

  /*----------- 23. Magic Hover Active & Remove ----------*/

  $(".price-style").hover(function () {
    $(".price-style").removeClass("price-active");
    $(this).addClass("price-active");
  });

  /*----------- 24. Popup Sidemenu ----------*/
  function popupSideMenu($sideMenu, $sideMunuOpen, $sideMenuCls, $toggleCls) {
    // Sidebar Popup
    $($sideMunuOpen).on("click", function (e) {
      e.preventDefault();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenu).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
    var sideMenuChild = $sideMenu + " > div";
    $(sideMenuChild).on("click", function (e) {
      e.stopPropagation();
      $($sideMenu).addClass($toggleCls);
    });
    $($sideMenuCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sideMenu).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sidemenu-wrapper",
    ".sideMenuToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 25. Popup SideCart ----------*/
  function popupSideMenu($sidecart, $sidecartOpen, $sidecartCls, $toggleCls) {
    // Sidebar Popup
    $($sidecartOpen).on("click", function (e) {
      e.preventDefault();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecart).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
    var sidecartChild = $sidecart + " > div";
    $(sidecartChild).on("click", function (e) {
      e.stopPropagation();
      $($sidecart).addClass($toggleCls);
    });
    $($sidecartCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($sidecart).removeClass($toggleCls);
    });
  }
  popupSideMenu(
    ".sideCart-wrapper",
    ".sideCartToggler",
    ".sideMenuCls",
    "show"
  );

  /*---------- 26. Search Box Popup ----------*/
  function popupSarchBox($searchBox, $searchOpen, $searchCls, $toggleCls) {
    $($searchOpen).on("click", function (e) {
      e.preventDefault();
      $($searchBox).addClass($toggleCls);
    });
    $($searchBox).on("click", function (e) {
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
    $($searchBox)
      .find("form")
      .on("click", function (e) {
        e.stopPropagation();
        $($searchBox).addClass($toggleCls);
      });
    $($searchCls).on("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      $($searchBox).removeClass($toggleCls);
    });
  }
  popupSarchBox(
    ".popup-search-box",
    ".searchBoxTggler",
    ".searchClose",
    "show"
  );

  // End
  /*---------- 27. Age Verification Popup ----------*/
  function ageVerification() {
    if (!sessionStorage.getItem("age_verified")) {
      var popupHTML =
        '<div id="age-verify-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); z-index: 1000000; display: flex; align-items: center; justify-content: center; font-family: \'Jost\', sans-serif;">' +
        '<div style="background: #0f1410; border: 1px solid rgba(255,255,255,0.1); border-radius: 30px; padding: 50px 40px; text-align: center; max-width: 550px; width: 90%; color: #fff; box-shadow: 0 30px 100px rgba(0,0,0,1); animation: ageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);">' +
        '<img src="assets/img/logo-white.png" alt="Pancann Logo" style="max-width: 240px; margin-bottom: 40px; filter: drop-shadow(0 0 10px rgba(71, 179, 45, 0.3));">' +
        '<h2 style="font-size: 36px; font-weight: 700; margin-bottom: 20px; color: #fff; letter-spacing: -0.5px;">Age Verification</h2>' +
        '<p style="font-size: 18px; color: #a1a1a1; margin-bottom: 40px; line-height: 1.7; font-family: \'Epilogue\', sans-serif;">This website contains products that are only suitable for those 21 years or older. Are you of legal age to enter?</p>' +
        '<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">' +
        '<button id="age-verify-yes" style="background: #47b32d; color: #fff; border: none; padding: 18px 50px; border-radius: 100px; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); min-width: 200px; box-shadow: 0 10px 20px rgba(71, 179, 45, 0.2);">Yes, I am over 21</button>' +
        '<button id="age-verify-no" style="background: rgba(255,255,255,0.05); color: #fff; border: 2px solid rgba(255,255,255,0.1); padding: 18px 50px; border-radius: 100px; font-size: 18px; font-weight: 700; cursor: pointer; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); min-width: 200px;">No, I am under 21</button>' +
        "</div>" +
        '<p style="margin-top: 40px; font-size: 13px; color: #555; text-transform: uppercase; letter-spacing: 1px;">Pancann CBD - Premium Quality</p>' +
        "</div>" +
        "<style>" +
        "@keyframes ageFadeIn { from { opacity: 0; transform: scale(0.95) translateY(30px); } to { opacity: 1; transform: scale(1) translateY(0); } }" +
        "#age-verify-yes:hover { background: #52ce34 !important; transform: translateY(-3px); box-shadow: 0 15px 30px rgba(71, 179, 45, 0.4) !important; }" +
        "#age-verify-yes:active { transform: translateY(-1px); }" +
        "#age-verify-no:hover { background: rgba(255,255,255,0.1) !important; border-color: #fff !important; transform: translateY(-3px); }" +
        "#age-verify-no:active { transform: translateY(-1px); }" +
        "</style>" +
        "</div>";

      $("body").append(popupHTML);
      $("body").css("overflow", "hidden");

      $("#age-verify-yes").on("click", function () {
        sessionStorage.setItem("age_verified", "true");
        $("#age-verify-overlay").fadeOut(400, function () {
          $(this).remove();
          $("body").css("overflow", "auto");
        });
      });

      $("#age-verify-no").on("click", function () {
        window.location.href = "https://www.google.com";
      });
    }
  }
  ageVerification();

  /*---------- 28. Ajax Review Form ----------*/
  function ajaxReviewForm(selectForm) {
    var form = $(selectForm);
    var invalidCls = "is-invalid";
    var formMessages = form.find(".form-messages");

    // Star Rating Logic
    form.find(".rating-select .stars a").on("click", function(e) {
      e.preventDefault();
      var rating = $(this).text();
      form.find('input[name="rating"]').val(rating);
      
      // Visual feedback
      $(this).addClass("active").prevAll().addClass("active");
      $(this).nextAll().removeClass("active");
    });

    form.on("submit", function(e) {
      e.preventDefault();
      var formData = form.serialize();
      
      // Basic validation
      var valid = true;
      var $email = form.find('[name="email"]');
      
      form.find('[name="name"], [name="email"], [name="message"]').each(function() {
        if (!$(this).val()) {
          $(this).addClass(invalidCls);
          valid = false;
        } else {
          $(this).removeClass(invalidCls);
        }
      });

      if ($email.val() && !$email.val().match(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)) {
        $email.addClass(invalidCls);
        valid = false;
      }

      if (!valid) return false;

      jQuery.ajax({
        url: form.attr("action"),
        data: formData,
        type: "POST",
      })
      .done(function(response) {
        formMessages.removeClass("error").addClass("success").text(response);
        form.find('input:not([type="hidden"]):not([type="submit"]), textarea').val("");
        form.find(".rating-select .stars a").removeClass("active");
        form.find('input[name="rating"]').val("0");
      })
      .fail(function(data) {
        formMessages.removeClass("success").addClass("error");
        if (data.responseText !== "") {
          formMessages.html(data.responseText);
        } else {
          formMessages.html("Oops! An error occurred. Please try again.");
        }
      });
    });
  }
  if ($(".ajax-review").length > 0) {
    ajaxReviewForm(".ajax-review");
  }

})(jQuery);
