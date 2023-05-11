// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Add event listeners on save buttons. Save to local storage.
  function saveEntry() {
    $('.saveBtn').on('click', function () {
      const hour = $(this).parent().attr('id');
      const text = $(this).siblings('.description').val();
      localStorage.setItem(hour, text);
    });
  }

  // Adds and removes the past, present, and future class from each .time-block
  function addColor() {
    $('.time-block').each(function () {
      let currentHour = dayjs().format('H');
      let sectionHour = parseInt(this.id);
      if (sectionHour == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (sectionHour < currentHour) {
        $(this).removeClass('future present').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  };

  // Display the user input from the local storage
  $('.time-block').each(function () {
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
  addColor();
  // Update the seconds every second
  const timeID = setInterval(updateTime, 1000);
  //Update every hours color every hour
  const hourID = setInterval(addColor, 3600000);
});
