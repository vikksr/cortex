//helper functions for DOM traversal and converting NodeList to iterable Array
if (!window.DOM_HELPER) {
  window.DOM_HELPER = {};
  window.DOM_HELPER.getAll = function(selector, node) {
    var domNode = node ? node : document;
    var domElemList = domNode.querySelectorAll(selector);
    if (!domElemList.length) {
      console.log("could not find elements with selector: " + selector);
      return false;
    }
    var jsArray = [];
    for (var i = 0; i < domElemList.length; i++) {
      jsArray.push(domElemList[i]);
    }
    return jsArray;
  };
  window.DOM_HELPER.checkDataSetId = function(e) {
    var imgId = e.target.dataset.id;
    return imgId ? imgId : e.target.parentNode.dataset.id;
  };
  window.DOM_HELPER.checkDataSetAction = function(e) {
    var action = e.target.dataset.action;
    return action ? action : e.target.parentNode.dataset.action;
  };
  window.DOM_HELPER.findRemoveInlineEvents = function(className){
    var el = document.querySelector(className);
    if(!el){
      console.log('could not find element with ' + className + ' selector');
      return;
    }
    el.onfocus = null;
    el.onclick = null;
    el.onkeydown = null;
    return el;
  }
};

//Modal innit function each time post form new and edit appears.
window.DOM_HELPER.setModal = function() {
  var modal = document.getElementById('mediaImages');
  var noImgSrc = function(x){return x !== 'imgsrc'};

  var ImgModal = {
    open: false,
    setting: null,
    modal: modal,
    mediaList: document.getElementById('mediaList'),
    displayOptions: document.getElementById('displayOptions'),
    displayButton: document.getElementById('displayImage'),
    ckeButton: DOM_HELPER.findRemoveInlineEvents('.cke_button__image'),
    imageList: DOM_HELPER.getAll('.mdl-list__item', modal),
    featuredMedia:{
      asset_id: null
    },
    tileMedia:{
      asset_id: null
    },
    removeSet: function(divs){
      divs[0].innerHTML = "<div style='text-align:center;line-height:70px;font-size:20px;vertical-align:middle;'>No Image Set</div>";
      divs[1].innerHTML = '';
      divs[2].querySelector('.rmm').style.display = 'none';
    },
    addSet: function(divs, imgId){
      var mediaimg = this.directory[imgId];

      divs[0].innerHTML = '<img height="120" style="vertical-align: top;" src="'+ mediaimg.data.imgsrc +'">';
      divs[1].innerHTML = Object.keys( mediaimg.data).filter(noImgSrc).map(function(keyy,i){
        return '<p><strong>'+ keyy +':</strong> ' + mediaimg.data[keyy] +'</p>';
      }).join('');
      divs[2].querySelector('.rmm').style.display = 'block';
    },
    removeFeatured: function() {
      this.featuredMedia.asset_id = null;
      this.removeSet(DOM_HELPER.getAll('#featuredMedia .tr-dw',this.modal));
    },
    removeTile: function() {
       this.tileMedia.asset_id = null;
       this.removeSet(DOM_HELPER.getAll('#tileMedia .tr-dw',this.modal));
    },
    setFeatured: function(imgId) {
       if(!imgId){
         return;
       }
       this.featuredMedia.asset_id = imgId;
       this.addSet(DOM_HELPER.getAll('#featuredMedia .tr-dw',this.modal), imgId);
       this.setting = 'DISPLAY';
       this.showOptions();
    },
    setTile: function(imgId) {
       if(!imgId){
          return;
       }
       this.tileMedia.asset_id = imgId;
       this.addSet(DOM_HELPER.getAll('#tileMedia .tr-dw',this.modal), imgId);
       this.setting = 'DISPLAY';
       this.showOptions();
    },
    showOptions: function(){
      this.mediaList.style.display = 'none';
      this.displayOptions.style.display = 'block';
    },
    showList: function(heading){
      this.listHeading.innerText = heading;
      this.mediaList.style.display = 'block';
      this.displayOptions.style.display = 'none';
    },
    INSERT: {
      headline: 'Insert Media from Media Library',
      action: null
    },
    DISPLAY: {
      featured: 'Set Featured Media from Media Library',
      tile: 'Set Tile Media from Media Library',
      action: null
    }

  };

  if (!ImgModal.modal.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }

  ImgModal.listHeading = ImgModal.mediaList.querySelector('#popupHeading');

  ImgModal.directory = ImgModal.imageList.reduce(function(imageHolder, elem) {
    imageHolder[elem.dataset.id] = {
      node: elem,
      data: {
        updated: elem.dataset.update,
        published: elem.dataset.pub,
        fileSize: elem.dataset.size,
        imgsrc: elem.dataset.url
      }
    };
    return imageHolder;
  }, {on_editor: []});
  ImgModal.imageHTML = function(url, id) {
    return '<img src="' + url + '"  data-media-id="' + id + '">';
  }

  ImgModal.toggle = function(setting) {
    var mo = ImgModal.open;
    ImgModal.setting = setting;
    ImgModal.modal[mo ? 'close' : 'showModal']();
    ImgModal.open = !mo;
  }

  return ImgModal;
}
//CKEDITOR first this event every time a CKEDITOR loads
CKEDITOR.on('instanceReady', function(e) {
  var ImageModal = window.DOM_HELPER.setModal();

  ImageModal.ckeButton.onclick = function() {
    ImageModal.showList('Insert Media from Media Library');
    ImageModal.ckeButton.classList[ImageModal.open ? 'remove' : 'add']('cke_button_on');
    ImageModal.toggle('INSERT');
  };

  ImageModal.displayButton.onclick = function() {
    ImageModal.showOptions();
    ImageModal.toggle('DISPLAY');
  };
  ImageModal.addFeatured = function(imgId) {

  }
  ImageModal.INSERT.action = function(imgId) {
    if (!imgId) {
      return
    }

    var mediaImage = ImageModal.directory[imgId];
    ImageModal.directory.on_editor.push(mediaImage);
    ImageModal.toggle(null);
    console.log('mediaImage', mediaImage);
    setTimeout(function() {
      CKEDITOR.instances['content_item_field_items_attributes_1_data[text]'].insertHtml(ImageModal.imageHTML(mediaImage.data.imgsrc, imgId));
      CKEDITOR.instances['content_item_field_items_attributes_1_data[text]'].insertText('');
    });

  }
  ImageModal.DISPLAY.action = function(setting){
     ImageModal.setting = setting;
     var displayType = setting.slice(3).toLowerCase();
     ImageModal.showList(ImageModal.DISPLAY[displayType]);
  }
  ImageModal.modal.onclick = function(e) {
    if (e.target.classList.contains('close')) {
      ImageModal.toggle(null);
      return;
    }
    if(ImageModal.setting === 'DISPLAY'){
      var action = window.DOM_HELPER.checkDataSetAction(e);
      if(action === 'SETFEATURED' || action === 'SETTILE'){
        ImageModal.DISPLAY.action(action);
      }
      if(action === 'removeTile' || action === 'removeFeatured'){
        ImageModal[action]();
      }
      return;
    }
    if(ImageModal.setting === 'SETTILE'){
      ImageModal.setTile(window.DOM_HELPER.checkDataSetId(e));
      return
    }
    if(ImageModal.setting === 'SETFEATURED'){
      ImageModal.setFeatured(window.DOM_HELPER.checkDataSetId(e));
      return
    }
    if(ImageModal.setting === 'INSERT'){
      ImageModal[ImageModal.setting].action(window.DOM_HELPER.checkDataSetId(e));
    }

  }
  console.log('ImageModal', ImageModal);
});
