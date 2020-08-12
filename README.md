# Zendesk Holiday Schedules

This app allows you to import Your Google Calender events to Zendesk Holiday Schedules.

### How to use

In order to use this Zendesk App, you need to activate the Google Calender API in your Google Developer Console.

0. Log in to your Google account with your browser before you configure this app.

1. Create a Google App Project with the Google Calender API enabled at <a href="https://console.developers.google.com/henhouse/?pb=%5B%22hh-0%22%2C%22calendar%22%2Cnull%2C%5B%5D%2C%22https%3A%2F%2Fdevelopers.google.com%22%2Cnull%2C%5B%5D%2Cnull%2C%22Enable%20the%20Google%20Calendar%20API%22%2C1%2Cnull%2C%5B%5D%2Cfalse%2Cfalse%2Cnull%2Cnull%2Cnull%2Cnull%2Cfalse%2Cnull%2Cfalse%2Cfalse%2Cnull%2Cnull%2Cnull%2C%22WEB_BROWSER%22%2C%22http%3A%2F%2Flocalhost%3A8000%22%2C%22Quickstart%22%2Ctrue%2C%22Quickstart%22%2Cnull%2Cnull%2Cfalse%5D&amp;authuser=1">Google Calendar API</a>.

2. Set an arbitrary project name.

<img src="https://t.gyazo.com/teams/treasure-data/3280bcae2548f00ecdce2a2482527235.png" width="320px">

3. Copy the Client ID. Use it to set up this app.

<img src="https://t.gyazo.com/teams/treasure-data/88e0abce2405c20a03e281653c24414f.png" width="320px">

4. Access Google's [Developer Console](https://console.cloud.google.com/apis/credentials) and select the project you created above.

5. Select Create Credentials from Credentials and create an API key.

<img src="https://t.gyazo.com/teams/treasure-data/be8cd8f0406c9e4f7c299734f4d63c4a.png" width="320px">

6. Save the created API key. This is also used in this app.

<img src="https://t.gyazo.com/teams/treasure-data/b31710729f4fb0af7d3d6108124c6492.png" width="320px">

7. Enable the created API key to be used only by Google Calender API.

<img src="https://t.gyazo.com/teams/treasure-data/5a22b1dd594e36317daedbab2ff6d584.png" width="320px">

8. Now you are ready to configure the app. You have one more step after installation, so let's bring up the configuration screen for the ID you just created in OAuth 2.0 Client ID in the Google Developer Console. You need to set the `approved source of JavaScript generation` setting after the app is launched.

<img src="https://t.gyazo.com/teams/treasure-data/b41c7f0e0040bba3b30cdc99600e2fae.png" width="320px">

9. set the Client ID and API key you saved during installation. When the first time you start the app, you will see the following message.

````
Not a valid origin for the client: https://xxxxx.apps.zdusercontent.com has not been whitelisted for client ID xxxxxx-xxxxx.apps. Please go to https://console.developers.google.com/ and whitelist this origin for your project's client ID.
````

<img src="https://t.gyazo.com/teams/treasure-data/e071d3a78f8a8f475641b602d69fba0f.png" width="320px">


10. Once you have completed your settings and refreshed your browser, the message will disappear (it may take a while). Then press the Autherize button and specify the calendar account you want to import in Google SSO.

<img src="https://t.gyazo.com/teams/treasure-data/2aa41247cc958bcca4e1111bb87d0150.png" width="320px">

11. you may see a Google Warning, but ignore it and go to zdusercontent.com (unsafe) to grant permission to load Google Calender.

12. After authentication, you can see the list of Schedules in Zendesk and the list of holidays you have added in the other calendars in Google Calender, set the calendars you want to import and the calendars you want to import, and click Import.

<img src="https://t.gyazo.com/teams/treasure-data/47986f3e14bf0c121e948a4e976b2f70.png" width="320px">

13. Confirm that the holiday has been added to Schedules.

<img src="https://t.gyazo.com/teams/treasure-data/5b08e42a6380b6c9b3394e9d2e81d37e.png" width="320px">
