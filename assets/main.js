var authorizeButton = document.getElementById('authorize_button');
var signoutButton = document.getElementById('signout_button');
var importButton = document.getElementById('import_button');
var client = ZAFClient.init();

$(function() {
  handleClientLoad();
  client.invoke('resize', { width: '300px', height: '300px' });
});

/**
 * https://developers.google.com/calendar/quickstart/js
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  client.metadata().then(function(metadata) {
    gapi.client.init({
      apiKey: metadata.settings.google_oauth_api_key,
      clientId: metadata.settings.google_oauth_client_id,
      discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
      scope: "https://www.googleapis.com/auth/calendar.readonly"
    }).then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      importButton.onclick = handleImportCalenderClick;
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    }, function(response) {
      console.log(response);
      let resultMessage = document.getElementById('result_message');
      let textContent;
      if (typeof response.details === "undefined") {
        textContent = document.createTextNode(response.error.status + ": " + response.error.message);
      } else {
        textContent = document.createTextNode(response.details);        
      }
      resultMessage.appendChild(textContent);
    });
  });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    document.getElementById('autherized_body').style.display = 'block';
    listCalenders();
    client.request('/api/v2/business_hours/schedules.json').then(
      function(response) {
        listSchedules(response.schedules)
      },
      function(error) {
        console.error(error.responseText);
      }
    );
  } else {
    authorizeButton.style.display = 'block';
    document.getElementById('autherized_body').style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 *   -d '{"holiday": {"name": "New Year", "start_date": "2021-12-30", "end_date": "2022-01-02"}}' \
 * Ref. https://developer.zendesk.com/rest_api/docs/support/schedules#create-a-holiday
 */
function createScheduleEvent(event, scheduleId) {
  let end_date = moment(event.end.date).add( -1, 'days').format('YYYY-MM-DD');  
  let sched = {
    "holiday": {
      "name": event.summary,
      "start_date": event.start.date,
      "end_date": end_date,
    }
  };
  let resultMessage = document.getElementById('result_message');

  client.request({
    url: '/api/v2/business_hours/schedules/' + scheduleId + '/holidays.json',
    method: 'POST',
    dataType: 'json',
    data: sched,
  }).then(
    function(response) {
      let textContent = document.createTextNode(event.summary + ' at '+  event.start.date +' was registered.\n');
      resultMessage.appendChild(textContent);
    }, function(error) {
      console.log(error.responseText);
      let textContent = document.createTextNode(event.summary + 'failed to register a holiday between ' + event.start.date +' and '+ end_date + '.\n');
      resultMessage.appendChild(textContent);
    });
}

/**
 * If a holiday name and startdate is duplicated with the new one, the new one is skipped to create and update.
 *   -d '{"holiday": {"name": "New Year", "start_date": "2021-12-30", "end_date": "2022-01-02"}}' \
 * Ref. https://developer.zendesk.com/rest_api/docs/support/schedules#list-holidays-for-a-schedule
 */
function listExistingHolidays(scheduleId, events) {
  let start_date = (new Date()).toISOString();
  let data = {
    "start_date": start_date
  };
  let resultMessage = document.getElementById('result_message')
  client.request({
    url: '/api/v2/business_hours/schedules/' + scheduleId + '/holidays.json',
    method: 'GET',
    dataType: 'json',
    data: data,
  }).then(
    function(response) {
      // Check duplicated holidays
      let filtered_events = events.filter(function (event) {
        return !response.holidays.some(holiday => holiday.name  === event.summary && holiday.start_date === event.start.date);
      });

      if (filtered_events.length > 0) {
        filtered_events.map(function (event) {
          createScheduleEvent(event, scheduleId);
        });

      } else {
        let textContent = document.createTextNode("All Events have been already registed. Same names and start date exist at Holidays.\n");
        resultMessage.appendChild(textContent);
      }
    }, function(error) {
      console.error(error.responseText);
    }
  );
}

/**
 * Make a list of Available events from the selected Google calender
 */
function listUpcomingEvents(calendarId, scheduleId) {
  gapi.client.calendar.events.list({
    'calendarId': calendarId,
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 100,
    'orderBy': 'startTime'
  }).then(function(response) {
    var events = response.result.items;
    if (events.length > 0) {
      listExistingHolidays(scheduleId, events);
    } else {
      console.warn("No Upcoming Request");
    }
  }, function(error) {
    console.error(error.responseText);
  });
}

/**
 *  Buton Click to import selected calender events to the target schedule
 */
function handleImportCalenderClick(event) {
  // Show a loading icon on the button
  importButton.disabled = true;
  importButton.textContent = 'Importing... ';
  let loadingIcon = document.createElement("span");
  loadingIcon.classList.add("spinner-border", "spinner-border-sm");
  loadingIcon.setAttribute("role", "status");
  loadingIcon.setAttribute("aria-hidden", "true");
  importButton.appendChild(loadingIcon);

  let calSelect = document.getElementById('calSelect');
  let schedSelect = document.getElementById('schedSelect');
  if (calSelect.options.length == 0 && schedSelect.options.length == 0) {
    console.log("No available schedules or No available calenders");
    return;
  }
  let calender = calSelect.options[calSelect.selectedIndex];
  let schedule = schedSelect.options[schedSelect.selectedIndex];
  listUpcomingEvents(calender.value, schedule.value);

  // Revert a loading icon on the button
  importButton.removeChild(loadingIcon);
  importButton.disabled = false;
  importButton.textContent = 'Import';
}

/**
 * Append a option element to the selectbox as its select node.
 * Used to display the results of the Calender List API call.
 */
function appendCalenders(calenders) {
  let selectList = document.getElementById('calSelect');
  calenders.map(function (calender) {
    let option = document.createElement("option");
    option.label = calender.summary;
    option.value = calender.id;
    selectList.appendChild(option);
  });
}

/**
 * Print the available calenders in the authorized user's calendar that are created by Google.
 * If no events are found an appropriate message is printed.
 */
function listCalenders() {
  gapi.client.calendar.calendarList.list({
    'showDeleted': false,
    'maxResults': 1000,
  }).then(function(response) {
    let calenders = response.result.items;
    if (calenders.length > 0) {
      let availableCals = calenders.filter(function (calender) {
        if (calender.id.indexOf("group.v.calendar.google.com") > -1) return calender;
      });
      appendCalenders(availableCals);
    } else {
      document.getElementById('result_message').textContent('No available calenders found.\n');
      console.log(calenders)
    }
  });
}

/**
 * Get a list of Zendesk Schedules and show a available schedules in SelectBox
 */
function listSchedules(schedules) {
  if (schedules.length > 0) {
    let selectList = document.getElementById("schedSelect");
    schedules.map(function (schedule) {
      let option = document.createElement("option");
      option.label = schedule.name;
      option.value = schedule.id;
      selectList.appendChild(option);
    });
  } else {
    document.getElementById('result_message').textContent('No available schedules found. Please create a new schedule.\n');
    console.log(schedules)
  }
}
