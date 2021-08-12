function doGet(e) {
  let email = Session.getActiveUser().getEmail();
  console.log("認証: " + email);
  if (e.parameter.role == "control") {
    if (isAdmin()) {
      return HtmlService.createTemplateFromFile("control").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle("コントロールパネル - 健康観察フォーム入力支援ツール");
    } else {
      let template = HtmlService.createTemplateFromFile("message");
      template.title = "認証エラー";
      template.message = "コントロールパネルにアクセスする権限がありません";
      return template.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle("エラー - 健康観察フォーム入力支援ツール");
    }
  }
  let template = HtmlService.createTemplateFromFile("root");
  template.my_class = e.parameter.class;
  template.my_number = e.parameter.number;
  template.my_name = e.parameter.name;
  return template.evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle("健康観察");
}

function isAdmin() {
  let email = Session.getActiveUser().getEmail();
  console.log("認証: " + email);
  return "ys-2020008@st.yachiyoshoin.ac.jp" || email == email.endsWith("@yachiyoshoin.ac.jp");
}

function register(target, json) {
  try {
    const KEY_FORMS = "forms";
    let properties = PropertiesService.getScriptProperties();
    let current = JSON.parse(properties.getProperty(KEY_FORMS)) || {};
    current[target] = json;
    properties.setProperty(KEY_FORMS, JSON.stringify(current));
  } catch (error) {
    return error.message;
  }
  return 0;
}

function deleteForm(target) {
  try {
    const KEY_FORMS = "forms";
    let properties = PropertiesService.getScriptProperties();
    let current = JSON.parse(properties.getProperty(KEY_FORMS)) || {};
    delete current[target];
    properties.setProperty(KEY_FORMS, JSON.stringify(current));
  } catch (error) {
    return error.message;
  }
  return 0;
}

function download() {
  const KEY_FORMS = "forms";
  let temp = {};
  for (let i = 0; i < 4; i++) {
    temp[new Date().getFullYear() - i] = [];
  }

  let data = JSON.parse(PropertiesService.getScriptProperties().getProperty(KEY_FORMS)) || {};
  for (let key of Object.keys(data)) {
    temp[key] = JSON.parse(data[key]);
  }
  console.log(JSON.stringify(temp));
  return temp;
}

function login() {
  let email = Session.getActiveUser().getEmail();
  let tag = email.substring(3, 7);
  const KEY_FORMS = "forms";
  let data = JSON.parse(PropertiesService.getScriptProperties().getProperty(KEY_FORMS)) || {};
  if (data[tag]) {
    try {
      let res = JSON.parse(data[tag]);
      return res;
    } catch (error) {}
  }
  return -1;
}
