// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add event listeners on save buttons. Save to local storage.
  function saveEntry() {
    $('.saveBtn').on('click', function() {
      const hour = $(this).parent().attr('id');
      const text = $(this).siblings('.description').val();
      localStorage.setItem(hour, text);
    });
  }


  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  // Display the user input from the local storage
  $('.time-block').each(function() {
    const hour = $(this).attr('id');
    const text = localStorage.getItem(hour);
    $(this).children('.description').val(text);
  });

  // Add code to display the current date in the header of the page.
  function updateTime() {
    const dateEl = $('#date');
    const timeEl = $('#time');
    const currentDate = dayjs().format('dddd, MMMM D, YYYY');
    const currentTime = dayjs().format('hh:mm:ss A');
    dateEl.text(currentDate);
    timeEl.text(currentTime);
  };

  // Call all the fucntions
  updateTime();
  saveEntry();
  // Update the seconds every second
  const timeID = setInterval(updateTime, 1000);
});
