const panel_html = `<div id="header" class="style-scope ytd-engagement-panel-section-list-renderer"><ytd-engagement-panel-title-header-renderer class="style-scope ytd-engagement-panel-section-list-renderer" modern-panels=""><!--css-build:shady--><!--css-build:shady--><div id="banner" aria-hidden="true" class="style-scope ytd-engagement-panel-title-header-renderer"></div>
<div id="ads-info-button" class="style-scope ytd-engagement-panel-title-header-renderer"></div>
<div id="header" class="style-scope ytd-engagement-panel-title-header-renderer">
  <div id="navigation-button" class="style-scope ytd-engagement-panel-title-header-renderer" hidden=""></div>
  <yt-img-shadow id="icon" class="style-scope ytd-engagement-panel-title-header-renderer no-transition" hidden><!--css-build:shady--><!--css-build:shady--><img id="img" draggable="false" class="style-scope yt-img-shadow" alt=""></yt-img-shadow>
  <div id="title-container" class="style-scope ytd-engagement-panel-title-header-renderer">
    <h2 id="title" class="style-scope ytd-engagement-panel-title-header-renderer" aria-label="Chapters" tabindex="-1">
      <yt-formatted-string id="title-text" ellipsis-truncate="" class="style-scope ytd-engagement-panel-title-header-renderer" ellipsis-truncate-styling="" title="Chapters">Chapters</yt-formatted-string>
      <yt-formatted-string id="contextual-info" class="style-scope ytd-engagement-panel-title-header-renderer" hidden="" is-empty=""></yt-formatted-string>
    </h2>
    <yt-formatted-string id="subtitle" class="style-scope ytd-engagement-panel-title-header-renderer" is-empty="" hidden=""><!--css-build:shady--><!--css-build:shady--><yt-attributed-string class="style-scope yt-formatted-string"></yt-attributed-string></yt-formatted-string>
    <div id="subtitle-complex" class="style-scope ytd-engagement-panel-title-header-renderer"></div>
  </div>
  <div id="action-button" class="style-scope ytd-engagement-panel-title-header-renderer" hidden=""></div>
  <div id="information-button" class="style-scope ytd-engagement-panel-title-header-renderer" hidden=""></div>
  <div id="menu" class="style-scope ytd-engagement-panel-title-header-renderer"></div>
  <div id="visibility-button" class="style-scope ytd-engagement-panel-title-header-renderer"><ytd-button-renderer class="style-scope ytd-engagement-panel-title-header-renderer" button-renderer="" button-next=""><!--css-build:shady--><yt-button-shape><button class="yt-spec-button-shape-next yt-spec-button-shape-next--text yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m yt-spec-button-shape-next--icon-only-default " aria-label="Close" style=""><div class="yt-spec-button-shape-next__icon" aria-hidden="true"><yt-icon style="width: 24px; height: 24px;"><!--css-build:shady--><!--css-build:shady--><yt-icon-shape class="style-scope yt-icon"><icon-shape class="yt-spec-icon-shape"><div style="width: 100%; height: 100%; fill: currentcolor;"><svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 100%; height: 100%;"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"></path></svg></div></icon-shape></yt-icon-shape></yt-icon></div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button></yt-button-shape><tp-yt-paper-tooltip fit-to-visible-bounds="" offset="8" disable-upgrade=""></tp-yt-paper-tooltip></ytd-button-renderer></div>
</div>
</ytd-engagement-panel-title-header-renderer></div>
<div id="content" class="style-scope ytd-engagement-panel-section-list-renderer"><ytd-macro-markers-list-renderer class="style-scope ytd-engagement-panel-section-list-renderer" modern="" panel-target-id="engagement-panel-macro-markers-description-chapters" panel-content-visible=""><!--css-build:shady--><!--css-build:shady--><div id="contents" class="style-scope ytd-macro-markers-list-renderer"></div>
<div id="sync-container" class="style-scope ytd-macro-markers-list-renderer">
  <tp-yt-paper-button id="sync-button" class="style-scope ytd-macro-markers-list-renderer" hidden="" style-target="host" role="button" tabindex="0" animated="" elevation="0" aria-disabled="false"><!--css-build:shady-->
    Sync to video time
  </tp-yt-paper-button>
  <yt-button-shape id="sync-button-modern" class="style-scope ytd-macro-markers-list-renderer"><button class="yt-spec-button-shape-next yt-spec-button-shape-next--filled yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-s " style=""><div class="cbox yt-spec-button-shape-next__button-text-content">Sync to video time</div><yt-touch-feedback-shape style="border-radius: inherit;"><div class="yt-spec-touch-feedback-shape yt-spec-touch-feedback-shape--touch-response-inverse" aria-hidden="true"><div class="yt-spec-touch-feedback-shape__stroke" style=""></div><div class="yt-spec-touch-feedback-shape__fill" style=""></div></div></yt-touch-feedback-shape></button></yt-button-shape>
</div>
</ytd-macro-markers-list-renderer></div>
<div id="footer" class="style-scope ytd-engagement-panel-section-list-renderer"></div>
`

var chapter_started = false;
/** 
 * 1. capture screenshot
 * 2. [startTime, endTime] 
*/

let frame_start, frame_end;
let frame_started = false;
let image;

let video_containers = document.getElementsByClassName("html5-main-video");
let main_video = video_containers[0];
const date = new Date(null);

// panel
let panel_init = false;
let panel_container = undefined;
let frame_toggle = true;
let _content_container = undefined;

// get video ID
let ID = "";

// initialize indexedDB
const DB_NAME = 'demo-chaptersDB';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'chapters';

const request = window.indexedDB.open("testDB", 3);
let db;

const openDB = () => {
    console.log("openDB...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = (event) => {
        // Equal to: db = req.result;
        db = req.result;
        console.log("openDb DONE: ", db);
    };
    req.onerror = (event) => {
        console.error("openDb:", event.target.errorCode);
    };

    req.onupgradeneeded = (event) => {
        console.log("openDb.onupgradeneeded");
        var store = event.currentTarget.result.createObjectStore(
            DB_STORE_NAME, { keyPath: 'videoID', autoIncrement: false });

        store.createIndex('videoID', 'videoID', { unique: true });
        // store.createIndex('title', 'title', { unique: true });
        // store.createIndex('desc', 'desc', { unique: false });
        // store.createIndex('frame_start', 'frame_start', { unique: false });
        // store.createIndex('frame_end', 'frame_end', { unique: false });
        // store.createIndex('img', 'img', { unique: false });
    };
}

/**
   * @param {string} store_name
   * @param {string} mode
   */
const getObjStore = (store_name, mode) => {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function clearObjectStore() {
    var store = getObjStore(DB_STORE_NAME, 'readwrite');
    var req = store.clear();
    req.onsuccess = function (evt) {
        console.log("store cleared...");
    };
    req.onerror = function (evt) {
        console.error("clearObjectStore:", evt.target.errorCode);
    };
}

function updatePanel(obj) {

}

/**
   * @param {IDBObjectStore} store
   * @param {JSON} obj
   */
function addData_DB(store, obj) {
    var req;
    try {
        req = store.add(obj);
    } catch (e) {
        throw e;
    }
    req.onsuccess = async (event) => {
        console.log("Insertion in DB successful");
        panel_init = false;
        initPanel(main_video);
        //   let data = store.getAll();
        //   console.log(data);
        // do sth
    };
    req.onerror = () => {
        console.error("addData_DB error: ", this.error);
        // do sth
    };
}

/**
   * @param {string} note_title
   * @param {HTMLNode} parent_endpoint
   */
function deleteNote(note_title, parent_endpoint) {
    var store = getObjStore(DB_STORE_NAME, 'readwrite');
    var cursorRequest = store.openCursor();
    console.log("cursorReq: ", cursorRequest);
    cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            let notes = cursor.value.chapters;
            for (let i = 0; i < notes.length; i++) {
                if (notes[i].title === note_title) {
                    notes.splice(i, 1);
                    break;
                }
            }

            if (cursor.value.videoID && cursor.value.videoID === ID) {
                cursor.value.chapters = notes;
                const upd_req = cursor.update(cursor.value);
                upd_req.onsuccess = () => {
                    parent_endpoint.remove();
                    console.log("[SUCCESS] note removed from DB...");
                    return;
                }
            } else {
                cursor.continue();
            }
        }
    }
}

/**
   * @param {string} videoID
   * @param {string} title
   * @param {string} desc
   * @param {number} frame_start
   * @param {number} frame_end
   * @param {DataURL} img
   */
function addChapter(videoID, title, desc, frame_start, frame_end, img) {
    main_video.pause();
    console.log("chapter arguments: ", arguments);
    let note_title = prompt("Title: ");
    let p_desc = prompt("Description: ");
    var obj;
    if (p_desc) {
        obj = { title: note_title, desc: p_desc, frame_start: frame_start, frame_end: frame_end, img: img };
    }
    else {
        obj = { title: note_title, desc: undefined, frame_start: frame_start, frame_end: frame_end, img: img };
    }

    console.log("db: ", db);
    var store = getObjStore(DB_STORE_NAME, 'readwrite');
    console.log("store: ", store);
    var cursorRequest = store.openCursor();
    console.log("cursorRequest: ", cursorRequest);

    let ID_found = false;
    cursorRequest.onsuccess = function (event) {
        const cursor = event.target.result;
        if (cursor) {
            console.log("cursor ok...");
            if (cursor.value.videoID && cursor.value.videoID == videoID) {
                // push values
                ID_found = true;
                console.log("element found: ", cursor.value.videoID);
                let video_notes = cursor.value.chapters;
                // first display in UI and then store in DB
                // code here for UI
                video_notes.push(obj);
                cursor.value.chapters = video_notes;
                const request = cursor.update(cursor.value);
                request.onsuccess = () => {
                    console.log("[SUCCESS] chapters updated");
                    console.log("panel: ", panel_init);
                    if (panel_init) {
                        panel_init = false;
                        frame_toggle = true;
                        initPanel(main_video);
                    }
                    main_video.play();
                }
            }
            console.log("next iter");
            event.target.result['continue']();
        }
        else {
            if (!ID_found) {
                console.log("Video ID not found. Creating entry...");
                var newID_obj = { videoID: videoID, chapters: [obj,] };
                addData_DB(store, newID_obj);
            }
            else {
                console.log("Created Entry...Reached Database end");
            }
        }
    }

    cursorRequest.onerror = function (event) {
        console.error("cursorRequest error: ", event.target.errorCode);
    }
}

function displayNotes(video, notes, content_container) {
    console.log("notes: ", notes);
    content_container.innerHTML = "";

    const _html = `<ytd-macro-markers-list-item-renderer class="style-scope ytd-macro-markers-list-renderer" rounded="" modern="" enable-problem-walkthrough="" carousel-type="MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT" style="--ytd-macro-markers-list-item-background-color: initial; --ytd-macro-markers-list-item-title-color: initial; --ytd-macro-markers-list-item-secondary-color: initial; --ytd-macro-markers-list-item-timestamp-background-color: initial;">
      </ytd-macro-markers-list-item-renderer>`;
    let index = 0;
    notes.forEach(element => {
        content_container.innerHTML += _html;
    });
    let endpoints = document.querySelectorAll("#endpoint", "a.yt-simple-endpoint", "a.ytd-macro-markers-list-item-renderer");
    let parent_endpoints = document.querySelectorAll("ytd-macro-markers-list-item-renderer.ytd-macro-markers-list-renderer");

    console.log(endpoints);

    console.log("width: ", window.innerWidth);
    let i = 0;
    let endp = endpoints[i];
    while (endp.offsetParent == null) {
        i++;
        endp = endpoints[i];
    }
    let n = (notes.length * 2) + i;
    // if (window.innerWidth <= 1016) {
    //     n = notes.length * 2;
    //     i = 0;
    // } else {
    //     n = (notes.length * 2) + 16;
    //     i = 16;
    // }

    let p_endp = 0;
    for (i; i < n; i += 2) {
        let endpoint = endpoints[i];
        console.log("endpoint: ", endpoint);
        let note = notes[index];
        // href link
        endpoint.href = `/watch?v=${ID}&t=${note.frame_start}s`;
        // video seek
        endpoint.addEventListener("click", function (e) {
            // fuked
            video.currentTime = note.frame_start;
            //console.log("video seeked to: ", video.currentTime);
        })
        // image
        let thumbnail = endpoint.childNodes[1];
        let img_container = thumbnail.childNodes[1];
        img_container.innerHTML = `<img src="${note.img}" id="img" draggable="false" class="style-scope yt-img-shadow" alt="">`

        // title
        let title_parent = endpoint.childNodes[3];
        console.log("title_parent: ", title_parent);
        let title_container = title_parent.childNodes[1];
        title_container.textContent = `${note.title}`;

        // description
        let desc = title_parent.childNodes[3];
        if (note.desc != undefined) {
            desc.outerHTML = '<h5 class="problem-walkthroughs style-scope ytd-macro-markers-list-item-renderer" style="font-size: 12px; margin-bottom: 6px; color: #606060">' + note.desc + '</h5>'
        } else {
            desc.setAttribute("hidden", "hidden");
        }

        // hide elements
        let parent_endpoint = parent_endpoints[p_endp];
        //console.log("parent_endp: ", parent_endpoint);
        let hid_div = parent_endpoint.childNodes[4];
        //console.log("hid_div: ". hid_div);
        hid_div.setAttribute("hidden", "hidden");

        // time
        let time_container = title_parent.childNodes[5];
        time_container.textContent = `${toTime(note.frame_start)}`

        // buttons
        let edit_btn = document.getElementById("action-button");
        edit_btn.innerHTML = '<span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" style="font-size: 17px; color: blue; cursor: pointer;" role="text">Edit</span>'
        edit_btn.addEventListener("click", function (e) {
            if (edit_btn.innerText === "Edit") {
                endpoint.setAttribute("contenteditable", true);
                edit_btn.innerHTML = '<span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" style="font-size: 17px; color: red; cursor: pointer;" role="text">Save</span>'
            } else {
                endpoint.setAttribute("contenteditable", false);
                edit_btn.innerHTML = '<span class="yt-core-attributed-string yt-core-attributed-string--white-space-no-wrap" style="font-size: 17px; color: blue; cursor: pointer;" role="text">Edit</span>'
            }
        })

        // close button
        endpoint.insertAdjacentHTML("afterend", "<button id='del-note-btn'>X</button>");

        var del_btn = document.querySelectorAll("button#del-note-btn")[p_endp];
        del_btn.onclick = function (e) {
            // remove from storage
            try {
                deleteNote(note.title, parent_endpoint);
            } catch (e) {
                console.error(e);
            }
        }

        index++;
        p_endp++;
    }
    var del_btn_style = `
        button#del-note-btn {
            float: right;
            margin-left: 12px;
            font-size: 14px;
            border: 2px;
            cursor: pointer;
            color: red;
        }
        button#del-note-btn:hover {
            color: white;
            background: #FA5028;
            border: 1px dotted black;
        }
        ytd-macro-markers-list-item-renderer.style-scope.ytd-macro-markers-list-renderer #del-note-btn {
            visibility: hidden;
        }
        ytd-macro-markers-list-item-renderer.style-scope.ytd-macro-markers-list-renderer:hover #del-note-btn {
            visibility: visible;
        }`
    var del_btn_styleSheet = document.createElement("style")
    del_btn_styleSheet.innerText = del_btn_style
    document.head.appendChild(del_btn_styleSheet)
    panel_init = true;
}

function getAllNotes(videoID, video, content_container) {
    let notes = undefined;
    const store = getObjStore(DB_STORE_NAME, 'readwrite');
    const storeRequest = store.get(videoID);
    storeRequest.onsuccess = (event) => {
        if (!storeRequest.result) {
            content_container.innerHTML = '<span class="style-scope yt-formatted-string" ellipsis-truncate ellipsis-truncate-styling> <h3 class="macro-markers yt-formatted-string style-scope ytd-macro-markers-list-item-renderer" style="margin-left: 16px; margin-bottom: 16px; color: #606060;" title="empty">No notes found...\nPress ctrl+a to start creating notes and release when finished</h3> </span>'
            panel_init = true;
        }
        else {
            notes = storeRequest.result.chapters;
            displayNotes(video, notes, content_container);
        }
    }
    storeRequest.onerror = (event) => {
        return storeRequest.result.value;
    }
}

function initPanel(video) {
    if (!panel_init) {
        // show panel
        if (frame_toggle) {
            let tg = document.getElementsByTagName("ytd-engagement-panel-section-list-renderer")[1];
            tg.remove();
        }
        let prePanelTag = document.getElementsByTagName("ytd-engagement-panel-section-list-renderer")[0];
        prePanelTag.insertAdjacentHTML('afterend', "<ytd-engagement-panel-section-list-renderer class='style-scope ytd-watch-flexy' modern-panels='' visibility='ENGAGEMENT_PANEL_VISIBILITY_EXPANDED' target-id='engagement-panel-macro-markers-description-chapters' style='order: 0;'></ytd-engagement-panel-section-list-renderer>");
        let panelTag = document.getElementsByTagName("ytd-engagement-panel-section-list-renderer")[1];
        console.log("panelTag: ", panelTag);
        panelTag.innerHTML = panel_html;
        let icons = document.querySelectorAll("yt-img-shadow#icon");
        let panel_icon = icons[0];
        console.log("panel_icon: ", panel_icon)
        panel_icon.hidden = true;
        let panelHeader, content_container;
        _content_container = content_container;
        let panelHeaders = document.querySelectorAll("yt-formatted-string#title-text");
        panelHeader = panelHeaders[0];
        let content_containers = document.querySelectorAll("div#contents.ytd-macro-markers-list-renderer");
        content_container = content_containers[0];
        // if (window.innerWidth <= 1016) {
        //     panelHeader = panelHeaders[0];
        //     content_container = content_containers[0];
        // } else {
        //     panelHeader = panelHeaders[1];
        //     content_container = content_containers[1];
        // }
        panel_container = panelTag;
        console.log("panel_header: ", panelHeader);
        panelHeader.innerHTML = "<span class='style-scope yt-formatted-string' ellipsis-truncate ellipsis-truncate-styling style='margin-left: 8px;'>Video notes</span>";

        // chapters
        setVideoID();
        console.log("videoID: ", ID);
        getAllNotes(ID, video, content_container);
        content_container.innerHTML = '<span class="style-scope yt-formatted-string" ellipsis-truncate ellipsis-truncate-styling> <h4 class="macro-markers yt-formatted-string style-scope ytd-macro-markers-list-item-renderer" style="margin: 16px;" title="loading...">Loading...</h4> </span>'
    } else {
        if (frame_toggle) {
            panel_container.setAttribute("hidden", "hidden");
            frame_toggle = false;
        } else {
            panel_container.removeAttribute("hidden");
            frame_toggle = true;
        }
    }
}

const toTime = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);

    const seconds = Math.floor(totalSeconds % 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours) return `${hours}:${minutes}:${seconds}`;
    else return `${minutes}:${seconds}`;

}

const saveImg = (canvas) => {
    let image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");
    var link = document.createElement('a');
    link.download = "my-image.png";
    link.href = image;
    link.click();
}

/**
   * @param {string} ID
   *    -> sets the data in localStorage
   */
const setData_local = (ID) => {
    if (!localStorage.getItem("size")) {
        localStorage.setItem("size", 0);
        let temp = []
        localStorage.setItem("data", JSON.stringify(temp));
    }

    let chapters_data_str = localStorage.getItem("data");
    let chapters_data = JSON.parse(chapters_data_str);
    let _data;
    let index = chapters_data.findIndex(elem => elem[0] === ID);
    if (index == -1) {
        _data = [
            ID,
            {
                start: frame_start,
                end: frame_end,
                img: image
            }
        ]
        chapters_data.push(_data);
        var _size = parseInt(localStorage["size"]);
        localStorage.setItem("size", JSON.stringify(_size + 1));
    } else {
        _data = {
            start: frame_start,
            end: frame_end,
            img: image
        }
        chapters_data[index].push(_data);
    }

    localStorage.setItem("data", JSON.stringify(chapters_data));
}

const setVideoID = () => {
    let url = window.location.href;
    let id_pos = url.search("v=") + 2;
    ID = "";

    while (id_pos < url.length && url[id_pos] != "=" && url[id_pos] != "&") {
        ID += url[id_pos];
        id_pos++;
    }

    console.log("ID: ", ID);
}

const keyDown = async (event) => {
    if (event.ctrlKey) {
        let video_containers = document.getElementsByClassName("html5-main-video");
        let video = video_containers[0];
        main_video = video;
        setVideoID();
        if ((event.key === 'a' || event.key === 'A') && !frame_started) {
            // get video ID
            console.log("ID: ", ID);
            console.log(main_video);

            frame_start = Math.floor(video.currentTime);
            frame_started = true;
            console.log("start: ", frame_start);
            chapter_started = true;

            // capture screenshot in a canvas tag
            let canvas = document.createElement("canvas");
            // canvas.setAttribute("hidden", "hidden");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

            image = canvas.toDataURL("image/png", 1.0).replace("image/png", "image/octet-stream");

        } else if (event.key === 'o' || event.key === 'O') {
            event.preventDefault();
            initPanel(video);
        }
        else if (event.key === 'k' || event.key === 'K') {
            clearObjectStore();
        } else if (event.key === 'p' || event.key === 'P') {
            let notes = getAllNotes(ID);
            console.log("NOTES: ", notes);
        }
        else if (event.key === 'q' || event.key === 'Q') {
            let notes = await getAllNotes(ID);
            console.log("loading notes...");
        }
        else if (event.ket === 'v' || event.key === 'V') {
            console.log("current Time: ", video.currentTime);
        }
    }
}

const keyUp = (event) => {
    if ((event.key === 'a' || event.key === 'A') && chapter_started) {
        event.preventDefault();
        frame_end = Math.floor(main_video.currentTime);
        frame_started = false;

        try {
            addChapter(ID, "title_temp", "demo description 1", frame_start, frame_end, image);

            console.log('chapter saved: ', frame_start, ": ", frame_end);
        } catch (e) {
            console.error(e);
        }
    }
    chapter_started = false;
}

const storageAvail = (storageType) => {
    let storage;
    try {
        storage = window[storageType];
        const x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            (e.name === "QUOTA_EXCEEDED_ERR" || e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
            storage &&
            storage.length != 0
        );
    }
}

const clear_AD = () => {
    const defined = v => v !== null && v !== undefined;
    setInterval(() => {
        // console.log("[...] searching for ads")
        const ad = [...document.querySelectorAll('.ad-showing')][0];
        if (defined(ad)) {
            const video = document.querySelector('video');
            if (defined(video)) {
                video.currentTime = video.duration;
                // click on skip button
                let skipped = false;
                let skip_btn;
                while(true) {
                    skip_btn = document.getElementsByClassName("ytp-ad-skip-button")[0]
                    if (skip_btn != undefined) {
                        skip_btn.click();
                        break;
                    }
                }
                console.log("ad skipped...")
            }
        }
    }, 500);
    // return function() {
    //     clearTimeout(timeout);
    // }
};

try {
    console.log("[RUNNING] script running...")
    clear_AD();
    openDB();
    setVideoID();
    document.addEventListener('keydown', keyDown);
    document.addEventListener('keyup', keyUp);
} catch (e) {
    console.error("Fatal Error: ", e);
}

