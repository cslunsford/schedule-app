$(function () {
  $(document).on('click', '.saveBtn', function() {
    var timeBlockEl = $(this).closest('.time-block');
    var i = timeBlockEl.index();
    var description = timeBlockEl.find('.description').val();
    storeDescription(i, description);
  });

  var schedule = $('#schedule');
  var currentTime = dayjs().hour();
  for (var i = 9; i <= 17; i++) {
    var timeBlockEl = $('<div>').addClass('row time-block');
    if (i < currentTime) {
      timeBlockEl.addClass('past');
    }
    else if (i == currentTime) {
      timeBlockEl.addClass('present');
    }
    else {
      timeBlockEl.addClass('future');
    }
    var hourEl = $('<div>').addClass('col-2 col-md-1 hour text-center py-3').text(dayjs().hour(i).format('hA'));
    var textAreaEl = $('<textarea>').addClass('col-8 col-md-10 description').attr('rows', '3');
    var saveBtnEl = $('<button>').addClass('btn saveBtn col-2 col-md-1').attr('aria-label', 'save').append($('<i>').addClass('fas fa-save'));
    timeBlockEl.append(hourEl, textAreaEl, saveBtnEl);
    schedule.append(timeBlockEl);
    }
  
  displayDescription(i, textAreaEl);
  
  function storeDescription(i, description) {
    localStorage.setItem('timeBlockEl' + i, JSON.stringify(description));
  }

  function displayDescription(i, textAreaEl) {
    var storedDescription = localStorage.getItem('timeBlockEl' + i);
    if (storedDescription) { 
      var parsedDescription = JSON.parse(storedDescription);
      textAreaEl.val(parsedDescription);
    }
    
  }


  $('#currentDay').text(dayjs().format('MMMM DD, YYYY h:mm A'));
  });
