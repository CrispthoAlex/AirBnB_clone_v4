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
/*
Fetch places
*/
$(function () {
  const data = {};
  const url = 'http://0.0.0.0:5001/api/v1/places_search/';
  $.ajax({
    url: url,
    type: 'POST'
    contentType: 'application/json',
    data: data,
    dataType: 'json',
    success: function (data) {
    $('section.places').each(function (place) {
      $(this).append(`<ARTICLE><div class="title_box"><h2>${place.name}</h2><div class="price_by_night">${place.price_by_night}</div></div><div class="information"><div class="max_guest">${place.max_guest} Guest{%if place.max_guest != 1 %}s{% endif %}</div><div class="number_rooms">${place.number_rooms} Bedroom{% if place.number_rooms != 1 %}s{% endif %}</div><div class="number_bathrooms">${place.number_bathrooms} Bathroom{% if place.number_bathrooms != 1 %}s{% edif %}</div></div><div class="user"><b>Owner:</b>${place.user.first_name} ${place.user.last_name}</div><div class="description">${place.description | safe}</div></ARTICLE>`);
    });
  });
});
