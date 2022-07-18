/* eslint-disable import/no-named-as-default */
// eslint-disable-next-line import/no-named-as-default-member
import FilerobotImageEditor from "../packages/filerobot-image-editor/src";
import config from "./demo-config";

function getElementById(id) {
  return document.getElementById(id);
}

const crop = getElementById("crop");
const finetune = getElementById("finetune");
const filter = getElementById("filter");
const filterLabel = getElementById("filter-label");
const watermark = getElementById("watermark");
const annotate = getElementById("annotate");
const annotateLabel = getElementById("annotate-label");
const resize = getElementById("resize");
const addImg = getElementById("add-image");
const modeOptions = getElementById("mode-options");
// const jsTabTitle = getElementById('js-code-tab');
const jsCodeWrapper = getElementById("js-code-wrapper");
const reactTabTitle = getElementById("react-code-tab");
const reactCodeWrapper = getElementById("react-code-wrapper");
const cdnTabTitle = getElementById("cdn-code-tab");
const cdnCodeWrapper = getElementById("cdn-code-wrapper");
const copyButtons = document.querySelectorAll(".copy-button");
const accordions = document.querySelectorAll("[data-accordion]");

let useCloudimage = false;
const { TABS } = FilerobotImageEditor;

const EXAMPLE_CODE_TABS = {
  "js-code-tab": jsCodeWrapper,
  "react-code-tab": reactCodeWrapper,
  "cdn-code-tab": cdnCodeWrapper
};

const DEFAULT_IMAGES_SRCS = [
  "https://scaleflex.cloudimg.io/v7/demo/river.png?w=100",
  "https://scaleflex.cloudimg.io/v7/demo/spencer-davis-unsplash.jpg?w=100",
  "https://scaleflex.cloudimg.io/v7/demo/damian-markutt-unsplash.jpg?w=100"
];

const selectedTabs = [
  TABS.ADJUST,
  TABS.FINETUNE,
  TABS.FILTERS,
  TABS.WATERMARK,
  TABS.ANNOTATE,
  TABS.RESIZE
];

const IMG_EDITOR_TABS = {
  adjust: TABS.ADJUST,
  finetune: TABS.FINETUNE,
  filter: TABS.FILTERS,
  watermark: TABS.WATERMARK,
  annotate: TABS.ANNOTATE,
  resize: TABS.RESIZE
};

const pluginConfig = {
  ...config,
  source: "https://scaleflex.cloudimg.io/v7/demo/river.png",
  tabsIds: selectedTabs,
  defaultTabId: TABS.CROP,
  defaultToolId: null,
  observePluginContainerSize: true,
  cloudimage: {
    token: "demo",
    version: "v7"
  },
  loadableDesignState: {
    annotations: {
      "Ellipse-1350843087957": {
        fill: "#000000",
        id: "Ellipse-1350843087957",
        name: "Ellipse",
        opacity: 1,
        radiusX: 1,
        radiusY: 1,
        rotation: -0,
        scaleX: 0.9999999999999989,
        scaleY: 1.0000000000000004,
        shadowBlur: 0,
        shadowColor: "#000000",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 1,
        stroke: "#000000",
        strokeWidth: 0,
        x: 0,
        y: 4
      },
      "Rect-1238543392829": {
        cornerRadius: 0,
        fill: "#000000",
        id: "Rect-1238543392829",
        name: "Rect",
        opacity: 1,
        rotation: 0,
        scaleX: 1,
        scaleY: 1,
        shadowBlur: 0,
        shadowColor: "#000000",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 1,
        stroke: "#000000",
        strokeWidth: 0,
        height: 2,
        width: 2,
        x: 0,
        y: 5
      },
      "Text-138291345185": {
        align: "left",
        fill: "#000000",
        fontFamily: "Comic-sans",
        fontSize: 0.1,
        fontStyle: "bold italic",
        height: 2,
        id: "Text-138291345185",
        letterSpacing: 0,
        lineHeight: 1,
        name: "Text",
        opacity: 1,
        shadowBlur: 0,
        shadowColor: "#000000",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 1,
        stroke: "#000000",
        strokeWidth: 1,
        text: "Filerobot...",
        width: 5,
        x: 0,
        y: 0
      },
      "Polygon-671435088951": {
        fill: "#000000",
        id: "Polygon-671435088951",
        name: "Polygon",
        opacity: 1,
        radius: 1,
        shadowBlur: 0,
        shadowColor: "#000000",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 1,
        // scaleY: 1,
        // scaleX: 1,
        sides: 4,
        stroke: "#000000",
        strokeWidth: 0,
        x: 0,
        y: 1
      },
      "Arrow-452178614845": {
        fill: "#000000",
        id: "Arrow-452178614845",
        lineCap: "butt",
        name: "Arrow",
        opacity: 1,
        pointerLength: undefined,
        pointerWidth: undefined,
        points: [0, 0, 222.06605157840522, -30.02384727924226],
        shadowBlur: 0,
        shadowColor: "#000000",
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowOpacity: 1,
        stroke: "#000000",
        strokeWidth: 3,
        x: 0,
        y: 8
      }
    }
  }
};

function onSave(imageInfo, designState) {
  const url = imageInfo[useCloudimage ? "cloudimageUrl" : "imageBase64"];
  const { fullName: fileName } = imageInfo;
  debugger
  let tmpLink = document.createElement("a");
  tmpLink.href = url;

  if (useCloudimage) {
    tmpLink.target = "_blank";
  } else {
    tmpLink.download = fileName;
  }

  tmpLink.style = "position: absolute; z-index: -111; visibility: none;";
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
  tmpLink = null;
  // return new Promise((resolve) => {
  //   setTimeout(() => {
  //     console.log('Simulating some Async process');
  //     console.log(
  //       'ex. (Uploading file to server), this message is logged once async process is done.',
  //     );
  //     resolve();
  //   }, 5000);
  // });
}

const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector("#editor_container"),
  pluginConfig
);

filerobotImageEditor.render({
  onSave,
  useCloudimage
});

function onChangeTabsHandler(event) {
  const { target } = event;
  const { value, checked } = target;
  const nextTab = IMG_EDITOR_TABS[value];

  if (checked) {
    if ( !selectedTabs.includes(nextTab)) {
      selectedTabs.push(nextTab);
    }
  } else {
    const removedTabIndex = selectedTabs.indexOf(nextTab);

    if (selectedTabs.includes(nextTab) && selectedTabs.length === 1) {
      target.checked = true;
      return;
    }

    selectedTabs.splice(removedTabIndex, 1);
  }

  filerobotImageEditor.render({ tabsIds: [...selectedTabs] });
}

function toggleActiveImage(imageContainer, imageSrc) {
  const removeResizeParamRegex = /\?.+/g;
  const imageUrl = imageSrc.replace(removeResizeParamRegex, "");
  const prevImageContainer = document.querySelector(
    "[data-image-editor-active-image]"
  );

  if (prevImageContainer) {
    prevImageContainer.removeAttribute("data-image-editor-active-image");
  }

  imageContainer.setAttribute("data-image-editor-active-image", "");

  filerobotImageEditor.render({ source: imageUrl });
}

function appendImageToContainer(imageSrc) {
  const imagesWrapper = document.querySelector(".uploaded-imgs-wrapper");
  const imageWrapper = document.createElement("div");

  imageWrapper.style.backgroundImage = `url(${imageSrc})`;

  imageWrapper.className = "uploaded-img";

  imageWrapper.onclick = () => toggleActiveImage(imageWrapper, imageSrc);

  imagesWrapper.appendChild(imageWrapper);
  imagesWrapper.scrollTop = imagesWrapper.scrollHeight;

  return imageWrapper;
}

function uploadImg(event) {
  const imageSrc = URL.createObjectURL(event.target.files[0]);

  const imageContainer = appendImageToContainer(imageSrc);

  toggleActiveImage(imageContainer, imageSrc);

  filerobotImageEditor.render({ source: imageSrc });
}

function changeModeHandler() {
  if (modeOptions.value === "Cloudimage") {
    annotate.checked = false;
    annotate.disabled = true;
    annotateLabel.style.color = "gray";
    annotateLabel.style.cursor = "auto";

    filter.checked = false;
    filter.disabled = true;
    filterLabel.style.color = "gray";
    filterLabel.style.cursor = "auto";

    useCloudimage = true;
  } else {
    if (selectedTabs.includes(annotate.name)) {
      annotate.checked = true;
    }

    if (selectedTabs.includes(filter.name)) {
      filter.checked = true;
    }

    filter.disabled = false;
    filterLabel.style.color = "#203254";
    filterLabel.style.cursor = "pointer";
    annotate.disabled = false;
    annotateLabel.style.color = "#203254";
    annotateLabel.style.cursor = "pointer";

    useCloudimage = false;
  }

  filerobotImageEditor.render({ useCloudimage, tabsIds: [...selectedTabs] });
}

function changeCodeTabHandler(event) {
  const selectedCodeTabId = event.target.id;
  const selectedCode = EXAMPLE_CODE_TABS[selectedCodeTabId];

  Object.values(EXAMPLE_CODE_TABS).forEach((codeTab) => {
    // eslint-disable-next-line no-param-reassign
    codeTab.style.display = "none";
  });

  selectedCode.style.display = "unset";
}

function toggleActiveCodeTab(event) {
  const nextCodeTab = event.target || event;

  changeCodeTabHandler(event);

  const prevCodeTab = document.querySelector("[selected-tab]");

  if (prevCodeTab) {
    prevCodeTab.removeAttribute("selected-tab");
  }

  nextCodeTab.setAttribute("selected-tab", "");
}

document.onreadystatechange = () => {
  DEFAULT_IMAGES_SRCS.forEach((imageSrc, index) => {
    const imageContainer = appendImageToContainer(imageSrc);

    if ( !index) {
      toggleActiveImage(imageContainer, imageSrc);
    }
  });
};

function copyCodeHandler(event) {
  const copyButton = event.currentTarget.getElementsByTagName("p")[0];
  const currentCodeTabId = document.querySelector("[selected-tab]").id;
  const currentCodeToCopy = EXAMPLE_CODE_TABS[currentCodeTabId];

  navigator.clipboard.writeText(currentCodeToCopy.innerText);

  copyButton.innerHTML = "Copied";

  setTimeout(() => {
    copyButton.innerHTML = "Copy";
  }, 500);
}

function showAccordionContent(event) {
  const contentId = event.target.getAttribute("data-accordion");
  const content = document.querySelector(
    `[data-accordion-content="${contentId}"]`
  );

  content.style.display = !content?.offsetWidth ? "block" : "none";
}

crop.addEventListener("change", onChangeTabsHandler);
finetune.addEventListener("change", onChangeTabsHandler);
filter.addEventListener("change", onChangeTabsHandler);
watermark.addEventListener("change", onChangeTabsHandler);
annotate.addEventListener("change", onChangeTabsHandler);
resize.addEventListener("change", onChangeTabsHandler);
addImg.addEventListener("change", uploadImg);
modeOptions.addEventListener("change", changeModeHandler);
// jsTabTitle.addEventListener('click', toggleActiveCodeTab);
reactTabTitle.addEventListener("click", toggleActiveCodeTab);
cdnTabTitle.addEventListener("click", toggleActiveCodeTab);
copyButtons.forEach((copyButton) => {
  copyButton.addEventListener("click", copyCodeHandler);
});
accordions.forEach((accordion) => {
  accordion.addEventListener("click", showAccordionContent);
});
