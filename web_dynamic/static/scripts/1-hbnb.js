/*
Select some Amenities to be comfortable
*/
$(document).ready(function () {
  const amenityDict = {};
  $('checkbox').on('change', function () {
    const dataID = document.getElementById('data-id');
    if ($(this).is(':checked')) {
      // add Amenity ID to amenityDict
      amenityDict[dataID] = document.getElementById('data-name');
    } else {
      // remove Amenity ID from amenityDict
      delete amenityDict[dataID];
    }
    if (Object.values(amenityDict).length > 0) {
      $('.amenities h4').text(Object.values(amenityDict).join(', '));
    } else {
      $('.amenities h4').text('&nbsp;');
    }
  });
});
