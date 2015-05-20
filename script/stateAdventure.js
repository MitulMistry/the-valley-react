﻿var theGame = function (game) {

}

//Sprite sheet frame numbers
var iconFontBaseFrame = 0;
var iconFontOverFrame = 1;
var iconFontClickFrame = 2;
var iconSaveBaseFrame = 3;
var iconSaveOverFrame = 4;
var iconSaveClickFrame = 5;
var iconSoundBaseFrame = 6;
var iconSoundOverFrame = 7;
var iconSoundClickFrame = 8;
var iconTwitterBaseFrame01 = 9;
var iconTwitterBaseFrame02 = 10;
var iconTwitterOverFrame = 11;
var iconTwitterClickFrame = 12;
var iconFacebookBaseFrame01 = 13;
var iconFacebookBaseFrame02 = 14;
var iconFacebookOverFrame = 15;
var iconFacebookClickFrame = 16;

//DEBUG MODE - turn on and off
var debugMode = true;
var testPASSED = false; //DEBUG - delete

//global variables
var text1;
var text2;
var slider01;
var slider02;

var rightSliderGap01;
var text1_distance;
var text1_topGap;

var rightSliderGap02;
var text2_distance;
var text2_topGap;

var mainFont = '13pt Berlin Sans FB';
var fontColorPower = '#F45E14';
var fontColorKarma = '#12B516';
var fontColorIntellect = '#00B0FF';
var fontColorLove = '#FC32DA';
var fontColorDarkTetrad = '#E60B1A';

var currentNodeKey = "AA001AD000AA"; //AA000AA000AB

var mainTextManager = new textManager(MODULE_ASCENT_OF_MAN);

theGame.prototype = {
	create: function () {
		this.game.stage.backgroundColor = '#000000';

		//BG
		var menuBG = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "menu_bg01");
		menuBG.anchor.setTo(0.5, 0.5);
		menuBG.alpha = .75;

		//Rotate BG (50000)
		//this.game.add.tween(menuBG).to({ angle: 360 }, 370000, Phaser.Easing.Linear.None, true).loop(true);

		var blackGradient = this.game.add.sprite(0, 0, "blackGradient");
		var blackGradient2 = this.game.add.sprite(0, 0, "blackGradient");
		blackGradient.width = this.game.width;
		blackGradient2.width = this.game.width;
		blackGradient2.y = this.game.height;
		blackGradient2.scale.y = -1;

		var frame01Width = this.game.width * 0.7225;
		var frame01Height = this.game.height * 0.5;
		var frame01XPos = ((this.game.width - frame01Width) / 2) - 11;
		var frame01YPos = this.game.height * 0.12;
		
		var frame02Width = frame01Width;
		var frame02Height = this.game.height * 0.3067;
		var frame02XPos = frame01XPos;
		var frame02YPos = ((this.game.height - frame01YPos - frame01Height - frame02Height) / 2) + frame01YPos + frame01Height;

		var slider01back = this.game.add.sprite(this.game.width - frame01XPos, frame01YPos, "slider01_back");
		var slider02back = this.game.add.sprite(this.game.width - frame02XPos, frame02YPos, "slider02_back");
		slider01back.height = frame01Height;
		slider02back.height = frame02Height;
		slider01 = this.game.add.sprite(this.game.width - frame01XPos, frame01YPos, "slider01");
		slider01.frame = 0;
		slider02 = this.game.add.sprite(this.game.width - frame02XPos, frame02YPos, "slider01");
		slider02.frame = 0;

		/*
		//Adjust sliders width
		slider01.width = 16;
		slider02.width = 16;
		slider01back.width = 16;
		slider02back.width = 16;
		*/

		//--------Sliders--------
		//Maybe use a 2x2 gray png and stretch to form borders instead? Then you can update them depending on size of text / screen
		slider01.inputEnabled = true;
		slider01.input.enableDrag({ boundsSprite: slider01back });
		slider01.input.boundsSprite = slider01back;
		slider01.input.dragFromCenter = false;
		slider01.input.allowHorizontalDrag = false;
		slider01.events.onInputOver.add(this.sliderOver, this);
		slider01.events.onInputOut.add(this.sliderOut, this);
		slider01.events.onInputDown.add(this.sliderDown, this);

		slider02.inputEnabled = true;
		slider02.input.enableDrag({ boundsSprite: slider02back });
		slider02.input.boundsSprite = slider02back;
		slider02.input.dragFromCenter = false;
		slider02.input.allowHorizontalDrag = false;
		slider02.events.onInputOver.add(this.sliderOver, this);
		slider02.events.onInputOut.add(this.sliderOut, this);
		slider02.events.onInputDown.add(this.sliderDown, this);

		//Debug items (Strip from final build)
		//-------------------------------------
		var textPointsPower;
		var textPointsKarma;
		var textPointsIntellect;
		var textPointsLove;
		var textPointsDarkTetrad;
		
		var stylePointsPower = { font: mainFont, fill: fontColorPower, align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		var stylePointsKarma = { font: mainFont, fill: fontColorKarma, align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		var stylePointsIntellect = { font: mainFont, fill: fontColorIntellect, align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		var stylePointsLove = { font: mainFont, fill: fontColorLove, align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		var stylePointsDarkTetrad = { font: mainFont, fill: fontColorDarkTetrad, align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		
		if (debugMode) {
			textPointsPower = this.game.add.text(this.game.width - frame01XPos + 30, frame01YPos, "100", stylePointsPower);
			textPointsKarma = this.game.add.text(this.game.width - frame01XPos + 30, frame01YPos + 20, "100", stylePointsKarma);
			textPointsIntellect = this.game.add.text(this.game.width - frame01XPos + 30, frame01YPos + 40, "100", stylePointsIntellect);
			textPointsLove = this.game.add.text(this.game.width - frame01XPos + 30, frame01YPos + 60, "100", stylePointsLove);
			textPointsDarkTetrad = this.game.add.text(this.game.width - frame01XPos + 30, frame01YPos + 80, "100", stylePointsDarkTetrad);
		}

		//To test if the code is getting to a breakpoint (before reaching this line), put textTest = true;
		var textTEST;
		if (debugMode && testPASSED) {
			textTEST = this.game.add.text(this.game.width / 2, frame01YPos / 2, "TEST PASSED", stylePointsKarma);
		textTEST.anchor.setTo(0.5, 0.5);}

		//-------------------------------------
		
		//-------Masks-------

		//	A mask is a Graphics object
		var textMask01 = this.game.add.graphics(0, 0);
		var textMask02 = this.game.add.graphics(0, 0);

		//	Shapes drawn to the Graphics object must be filled.
		textMask01.beginFill(0xffffff);
		textMask01.drawRect(frame01XPos, frame01YPos, this.game.width, frame01Height);
		textMask02.beginFill(0xffffff);
		textMask02.drawRect(frame02XPos, frame02YPos, this.game.width, frame02Height);

		//Embedding fonts? Google Fonts?
		var style1 = { font: '13pt Berlin Sans FB', fill: '#EFB143', align: 'left', wordWrap: true, wordWrapWidth: frame01Width };
		var style2 = { font: 'bold 12pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: frame01Width };

		//var textPrint = testStoryModuleMap.get(currentNodeKey);
		//var textPrint = mainTextManager.getText(currentNodeKey);
		var textPrint = currentModuleTextMap.get(currentNodeKey);
		
		text1 = this.game.add.text(frame01XPos, frame01YPos, textPrint, style1);
		//text1.lineSpacing = 5;

		text1.mask = textMask01;

		//Add choices to group? Then move group as a whole with slider?
		text2 = this.game.add.text(frame02XPos, frame02YPos, "Morbi ultricies ante orci, vitae semper nibh consectetur dignissim. \n\nDonec odio turpis, pharetra vel dolor a, malesuada vulputate turpis. \n\nIn vel porta urna,volutpat auctor ante. \n\nPhasellus quam nisi, consequat in elementum ut, accumsan in ex.\n\nSed pulvinar nunc urna, in porttitor lectus imperdiet nec.\n\nSuspendisse accumsan congue gravida. \n\nPhasellus quam nisi, consequat in elementum ut, accumsan in ex.\n\nSed pulvinar nunc urna, in porttitor lectus imperdiet nec.\n\nSuspendisse accumsan congue gravida.", style2);
		text2.lineSpacing = -3.5;

		text2.mask = textMask02;
		
		//Adjust slider height based on amount of text, or else hide
		if (text1.height > frame01Height)
		{
			slider01.visible = true;
			slider01back.visible = true;
			slider01.height = (frame01Height / text1.height) * frame01Height;
		} else {
			slider01.height = frame01Height;
			slider01.visible = false;
			slider01back.visible = false;
		}

		if (text2.height > frame02Height) {
			slider02.visible = true;
			slider02back.visible = true;
			slider02.height = (frame02Height / text2.height) * frame02Height;
		} else {
			slider02.height = frame02Height;
			slider02.visible = false;
			slider02back.visible = false;
		}

		//Slider movement calculations
		rightSliderGap01 = slider01back.height - slider01.height;
		text1_distance = (rightSliderGap01 / slider01back.height) * text1.height;
		text1_topGap = frame01YPos;

		rightSliderGap02 = slider02back.height - slider02.height;
		text2_distance = (rightSliderGap02 / slider02back.height) * text2.height;
		text2_topGap = frame02YPos;

		//text1.inputEnabled = true;
		//text1.input.enableDrag({ lockCenter: false, pixelPerfect: false });
		//text1.input.enableDrag({ pixelPerfect: false, boundsRect: textBounding01 });

		//--------Icons--------
		var iconXoffset = this.game.width * .0625;

		var iconTwitterButton = this.game.add.button(iconXoffset, this.game.height * 0.8267, "icons", this.iconTwitter, this);
		iconTwitterButton.anchor.setTo(0.5, 0.5);
		iconTwitterButton.frame = 9;
		iconTwitterButton.input.useHandCursor = true;
		iconTwitterButton.events.onInputOver.add(this.iconOver, this);
		iconTwitterButton.events.onInputOut.add(this.iconOut, this);
		iconTwitterButton.events.onInputDown.add(this.iconDown, this);

		var iconFacebookButton = this.game.add.button(iconXoffset, this.game.height * 0.9283, "icons", this.iconFacebook, this);
		iconFacebookButton.anchor.setTo(0.5, 0.5);
		iconFacebookButton.frame = 13;
		iconFacebookButton.input.useHandCursor = true;
		iconFacebookButton.events.onInputOver.add(this.iconOver, this);
		iconFacebookButton.events.onInputOut.add(this.iconOut, this);
		iconFacebookButton.events.onInputDown.add(this.iconDown, this);

		var iconFontButton = this.game.add.button(this.game.width - iconXoffset, this.game.height * 0.72, "icons", this.iconFont, this, iconFontOverFrame, iconFontBaseFrame, iconFontClickFrame);
		iconFontButton.anchor.setTo(0.5, 0.5);
		iconFontButton.frame = iconFontBaseFrame;

		var iconSaveButton = this.game.add.button(this.game.width - iconXoffset, this.game.height * 0.8267, "icons", this.iconSave, this, iconSaveOverFrame, iconSaveBaseFrame, iconSaveClickFrame);
		iconSaveButton.anchor.setTo(0.5, 0.5);
		iconSaveButton.frame = iconSaveBaseFrame;
		iconSaveButton.input.useHandCursor = true;

		var iconSoundButton = this.game.add.button(this.game.width - iconXoffset, this.game.height * 0.9283, "icons", this.iconSound, this, iconSoundOverFrame, iconSoundBaseFrame, iconSoundClickFrame);
		iconSoundButton.anchor.setTo(0.5, 0.5);
		iconSoundButton.frame = iconSoundBaseFrame;

		//Fade in
		var blackFade = this.game.add.sprite(0, 0, "rectangle_black");
		blackFade.height = this.game.height;
		blackFade.width = this.game.width;
		var blackFadeTween = this.game.add.tween(blackFade);
		blackFadeTween.to({ alpha: 0 }, 500);
		blackFadeTween.start();
		blackFade.destroy;
	},
	sliderOver: function (sprite) {
		sprite.frame = 1;
	},
	sliderOut: function (sprite) {
		sprite.frame = 0;
	},
	sliderDown: function (sprite) {
		sprite.frame = 2;
	},
	iconOver: function (sprite) {
		if (sprite.frame === iconTwitterBaseFrame01) {
			sprite.frame = iconTwitterBaseFrame02;
		}
		else if (sprite.frame === iconFacebookBaseFrame01) {
			sprite.frame = iconFacebookBaseFrame02;
		}
	},
	iconOut: function (sprite) {
		if (sprite.frame === iconTwitterBaseFrame02) {
			sprite.frame = iconTwitterBaseFrame01;
		}
		else if (sprite.frame === iconFacebookBaseFrame02) {
			sprite.frame = iconFacebookBaseFrame01;
		}
	},
	iconDown: function (sprite) {
		if (sprite.frame === iconTwitterBaseFrame02) {
			sprite.frame = iconTwitterBaseFrame01;
		}
		else if (sprite.frame === iconFacebookBaseFrame02) {
			sprite.frame = iconFacebookBaseFrame01;
		}
	},
	iconTwitter: function () {
		window.open("https://twitter.com/home?status=Check%20out%20the%20epic%20text%20adventure%20-%20%22The%20Valley%22%20http://MitulMistry.com/%20%23indiedev", '_blank');
	},
	iconFacebook: function () {
		window.open("https://www.facebook.com/sharer/sharer.php?u=http://MitulMistry.com", '_blank');
	},
	iconFont: function () {

	},
	iconSave: function () {
		this.game.state.start("stateMenu");
	},
	iconSound: function () {

	},
	update: function () {
		//Move text based on sliders
		text1.y = text1_topGap - (((slider01.y - text1_topGap) / rightSliderGap01) * text1_distance);
		text2.y = text2_topGap - (((slider02.y - text2_topGap) / rightSliderGap02) * text2_distance);
	}
}