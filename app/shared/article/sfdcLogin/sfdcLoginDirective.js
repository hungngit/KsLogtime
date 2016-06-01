var sfLoginForm = $('<form>', {'method': 'post', 'action': 'https://login.salesforce.com/?startURL=/a10/e', 'target': '_blank'}).hide();
sfLoginForm.append($('<input>', {'type': 'hidden', 'name': 'un', 'value': ''}));
sfLoginForm.append($('<input>', {'type': 'hidden', 'name': 'pw', 'value': ''}));
sfLoginForm.appendTo('body').submit();