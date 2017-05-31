'use strict';

function escapeHTML(str) {
  return str.replace(/[&"'<>]/g, function (m) {
    return escapeHTML.replacements[m];
  });
}
escapeHTML.replacements = { '&': '&amp;', '"': '&quot;', '\'': '&#39;', '<': '&lt;', '>': '&gt;' };

$.ajax({
  method: 'GET',
  url: 'manifest.json',
  dataType: 'json',
  mimeType: 'application/json',
  success: function success(data) {
    var version = escapeHTML(data.version);
    $('#version').html(version);
  }
});