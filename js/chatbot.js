window.watsonAssistantChatOptions = {
    integrationID: "77753f4d-eb9b-4e21-910a-fb63605d180d",
    region: "au-syd",
    serviceInstanceID: "b2f947de-4668-439b-89c4-8498a33cf0a9",
    onLoad: async (instance) => {
        await instance.render();
    }
};

setTimeout(function () {
    const t = document.createElement('script');
    t.src = "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
});