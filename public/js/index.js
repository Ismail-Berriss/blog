$(document).ready(function () {
  /* Start Carousel */
  var currentIndex = 0;
  var items = $(".carousel-item");
  var totalItems = items.length;

  function slideTo(index) {
    $(".carousel-inner").css("transform", "translateX(-" + index * 100 + "%)");
  }

  $(".carousel-control.next").click(function () {
    currentIndex = (currentIndex + 1) % totalItems;
    slideTo(currentIndex);
  });
  /* End Carousel */

  /* Start Remove Alert */
  $(".close").click(function () {
    $(this).closest(".alert").hide();
  });
  /* End Remove Alert */

  /* Start actions */
  $(document).on("click", function (event) {
    // Check if the click event occurred outside of the .actions element or its children
    if (!$(event.target).closest(".actions").length) {
      // If clicked outside, hide the .actions-list
      $(".actions-list").addClass("hidden");
      // Also remove the bg-grey class from the button
      $(".actions > button").removeClass("bg-grey");
    }
  });

  $(".actions").click(function () {
    $(".actions > button").toggleClass("bg-grey");
    $(".actions-list").toggleClass("hidden");
  });
  /* End actions */

  /* Start Load More */
  function loadMorePosts() {
    let requestData = {
      postsLength: $("#posts-content").children(".grid-item").length,
    };

    $.ajax({
      url: "/load-posts",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify(requestData),
      success: function (data) {
        data.forEach((element) => {
          if (element) {
            $("#posts-content").append(`
              <a href="/post/${element.id}" class="grid-item">
                <img src="imgs/uploads/${element.image}" class="mb-4 rounded-2xl h-56 w-full  object-cover" alt="">
                <h1 class="font-bold text-2xl mb-2">
                  ${element.title}
                </h1>
                <p class="text-slate-500 mb-2 line-clamp-3">
                  ${element.content}
                </p>
                <p class="text-sm">
                  ${element.name} &bull; ${element.timestamp}
                </p>
              </a>
            `);
          } else {
            $("#load-posts").addClass("hidden");
          }
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching additional content: ", error);
      },
    });
  }

  $("#load-posts").click(function () {
    loadMorePosts();
  });
  /* End Load More */
});
