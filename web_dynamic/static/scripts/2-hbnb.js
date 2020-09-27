/*
Select some Amenities to be comfortable
*/
$(document).ready(function () {
  const amenityDict = {};
  $('.amenities input:checkbox').on('change', function () {
    $(this).each(function () {
      const dataID = $(this).attr('data-id');
      if (this.checked) {
        // add Amenity ID to amenityDict
        amenityDict[dataID] = $(this).attr('data-name');
      } else {
        // remove Amenity ID from amenityDict
        delete amenityDict[dataID];
      }
    });
    if (Object.values(amenityDict).length > 0) {
      $('.amenities h4').text(Object.values(amenityDict).join(', '));
    } else {
      $('.amenities h4').html('&nbsp;');
    }
  });
});
/*
API status
*/
$(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    console.log(response.status);
    if (response.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
