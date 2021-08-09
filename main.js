function doGet(e) {
  return HtmlService.createTemplateFromFile("control").evaluate().addMetaTag("viewport", "width=device-width, initial-scale=1.0").setTitle("コントロールパネル - 健康観察フォーム入力支援ツール");
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
