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
  Change to localhost=127.0.0.1 to test
*/
$.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
  console.log(response.status);
  if (response.status === 'OK') {
    $('DIV#api_status').addClass('available');
  } else {
    $('DIV#api_status').removeClass('available');
  }
});
/*
  Fetch places
  Change to localhost=127.0.0.1 to test
*/
const place = {};
$.ajax({
  url: 'http://0.0.0.0:5001/api/v1/places_search/',
  type: 'POST',
  data: JSON.stringify(place), // Convert to text string json
  contentType: 'application/json',
  dataType: 'json',
  success: function (places) {
    $.each(places, function (iterator, place) {
      $('section.places').append(`<ARTICLE><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guest</div><div class="number_rooms">${place.number_rooms} Bedroom</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom</div></div><div class="description">${place.description}</div></ARTICLE>`);
    });
  }
});
