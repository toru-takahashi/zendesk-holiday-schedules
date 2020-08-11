# Zendesk Holiday Schedules

Google Calenderの祝日イベントをZendeskのHolidaysに登録するZendesk App

### 利用手順

本アプリを利用するためには、Google Developer ConsoleのAPIとサービスにて、Google Calender APIの有効化を行う必要があります。

0. 事前に、利用するGoogleアカウントにブラウザでログインを行なってください

1. <a href="https://console.developers.google.com/henhouse/?pb=%5B%22hh-0%22%2C%22calendar%22%2Cnull%2C%5B%5D%2C%22https%3A%2F%2Fdevelopers.google.com%22%2Cnull%2C%5B%5D%2Cnull%2C%22Enable%20the%20Google%20Calendar%20API%22%2C1%2Cnull%2C%5B%5D%2Cfalse%2Cfalse%2Cnull%2Cnull%2Cnull%2Cnull%2Cfalse%2Cnull%2Cfalse%2Cfalse%2Cnull%2Cnull%2Cnull%2C%22WEB_BROWSER%22%2C%22http%3A%2F%2Flocalhost%3A8000%22%2C%22Quickstart%22%2Ctrue%2C%22Quickstart%22%2Cnull%2Cnull%2Cfalse%5D&amp;authuser=1">Google Calendar API</a>のリンクでGoogle Calender APIを有効化したGoogle App Projectを作成します。

2. 任意のプロジェクト名の設定を行います。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/3280bcae2548f00ecdce2a2482527235.png)](https://treasure-data.gyazo.com/3280bcae2548f00ecdce2a2482527235)

3. Client IDをコピーしておきます。本アプリの設定に利用します。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/88e0abce2405c20a03e281653c24414f.png)](https://treasure-data.gyazo.com/88e0abce2405c20a03e281653c24414f)

4. Googleの[Developer Console](https://console.cloud.google.com/apis/credentials)にアクセスし、上述で作成したプロジェクトを選択します。

5. 認証情報から認証情報の作成を選択し、APIキーを作成します。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/90176582d70d25a58263814ab5dccc04.png)](https://treasure-data.gyazo.com/90176582d70d25a58263814ab5dccc04)

6. 作成したAPIキーを保存します。こちらも本アプリで利用します。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/609ccc5ffe4128f0c28ff76b95ec71ee.png)](https://treasure-data.gyazo.com/609ccc5ffe4128f0c28ff76b95ec71ee)

7. 作成したAPIキーをGoogle Calender APIだけで利用できるようにします。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/f7c102f2c745a54b533f67b8bd85d342.png)](https://treasure-data.gyazo.com/f7c102f2c745a54b533f67b8bd85d342)

8. ここまでで、アプリのインストールに必要な準備ができました。インストール後にもうワンステップあるので、Google Developer Consoleの OAuth 2.0 クライアント ID で先ほど作成したIDの設定画面を表示しておきましょう。`承認済みの JavaScript 生成元`の設定をアプリ起動後に設定する必要があります。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/eaa556ad7d3d53d1f47de27648764fb1.png)](https://treasure-data.gyazo.com/eaa556ad7d3d53d1f47de27648764fb1)

9. インストール時に保存したClient IDおよびAPIキーを設定します。初回起動時に下記のメッセージが表示されるので、`https://xxxxx.apps.zdusercontent.com`の箇所をコピーし、承認済みの JavaScript 生成元のURIのlocalhostと入れ替えてから保存します。

```
Not a valid origin for the client: https://xxxxx.apps.zdusercontent.com has not been whitelisted for client ID xxxxxx-xxxxx.apps.googleusercontent.com. Please go to https://console.developers.google.com/ and whitelist this origin for your project's client ID.
````

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/e071d3a78f8a8f475641b602d69fba0f.png)](https://treasure-data.gyazo.com/e071d3a78f8a8f475641b602d69fba0f)

10. 設定が完了し、ブラウザを更新すると、該当のメッセージが表示されなくなります（少し時間がかかることがあります）。その後、Autherizeボタンを押して、Google SSOにて取り込みたいカレンダーのアカウントを指定します。

11. Googleのワーニングが表示されることがありますが、無視して、Go to zdusercontent.com (unsafe)を行い、Google Calenderへの読み込み権限を許可します。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/2aa41247cc958bcca4e1111bb87d0150.png)](https://treasure-data.gyazo.com/2aa41247cc958bcca4e1111bb87d0150)


12. 認証後、ZendeskのSchedulesの一覧とGoogle Calenderのその他のカレンダーで追加した祝日一覧が参照できるので、それぞれ取り込みたいカレンダーと、祝日を取り込みたいカレンダーを設定し、Importをクリックします。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/47986f3e14bf0c121e948a4e976b2f70.png)](https://treasure-data.gyazo.com/47986f3e14bf0c121e948a4e976b2f70)

13. Schedulesに祝日が登録されたことを確認します。

[![Image from Gyazo](https://t.gyazo.com/teams/treasure-data/5b08e42a6380b6c9b3394e9d2e81d37e.png)](https://treasure-data.gyazo.com/5b08e42a6380b6c9b3394e9d2e81d37e)