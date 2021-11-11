$(function () {
  var globalWinw = $(window).width();



  var lang = "en";
  if ($("html").hasClass("LANG-en")) {
    lang = "en";
  } else if ($("html").hasClass("LANG-cn")) {
    lang = "cn";
  }

  var btnText = {
    play: {
      cn: "点击参与互动",
      en: "Join live discussion"
    },
    replay: {
      cn: "下载演讲材料",
      en: "Presentation Documents"
    },
    "coming soon": {
      cn: "",
      en: ""
    },
    replayTitle: {
      cn: "选择演讲主题",
      en: "Choose a topic"
    }
  }


  var iframe = $(".video-play-area iframe");
  var commandUl = $(".video-play-command .box");
  var listUl = $(".video-play-list .ul");
  var btnBox = $(".video-play-list .btnBox");
  //通过data.agenda[lang].day 相当于id
  //class为状态 play 正在直播 replay 回放 其余为未开始

  var switchWin = {
    init: function () {
      this.tabClick();

      //触发点击直播
      commandUl.find(".li:nth-child(1)").trigger("click");
    },
    data: {
      agenda: {
        "cn": [{
            active: "replay",
            day: "24",
            iframe: "https://myun-hw-s3.myun.tv/melj80jz/lxxkr3p4/5rgmnozl/ljrj7x85_1582527859652267898_480p.m3u8",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7BB1AA7BC5-D4B8-418B-83CA-81C2E413BC2C%7D",
            title: "主题演讲1：行业数字化转型",
            con: [{
                time: "17:00-17:20",
                topic: "新联接、新计算、新平台、新生态，迈向智能世界2030",
                speaker: {
                  name: "马悦",
                  title: "华为企业BG副总裁"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lrg6j56m/origin",
              },
              {
                time: "17:20-17:45",
                topic: "政府数字化转型",
                speaker: {
                  name: "阿拉丁·里洛",
                  title: "东盟经济共同体副秘书长"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o17jry0o/origin"
              },
              {
                time: "17:45-18:00",
                topic: "交通业数字化转型",
                speaker: {
                  name: "张立轩",
                  title: "深圳机场集团数字化总监"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o17jr90o/origin"
              },
              {
                time: "18:00-18:30",
                topic: "金融业数字化转型",
                speaker: {
                  name: "陈昆德",
                  title: "前招商银行首席信息官，华为企业BG全球金融业务首席数字化转型官"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mpr1gavl/origin"
              },
              {
                time: "18:30-18:50",
                topic: "电力数字化转型",
                speaker: {
                  name: "刘建明",
                  title: "中国工信部产业发展促进中心“智能电网技术与装备”专家委员会主任"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/makarvko/origin"
              }
            ]
          },
          {
            day: "2501",
            active: "replay",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270259&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7B6EFCF035-766B-4E4A-AB95-6AB0438D427E%7D",
            title: "主题演讲2：2020华为企业BG明星产品解决方案发布会",
            con: [{
                time: "17:00-17:30",
                topic: "HiCampus解决方案发布：重新定义园区",
                speaker: {
                  name: "孙福友",
                  title: "华为企业BG副总裁"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/43e97f9b0b7049b7a1318a9f09807017",
                src: "https://webcasting.bizconf.cn/show/videolink/ogb43bgl/origin"
              },
              {
                time: "17:30-18:05",
                topic: "HiDC解决方案发布：重新定义数据中心",
                speaker: {
                  name: "Wing Kin Leung",
                  title: "华为企业BG CTO"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/894e77ce7b6749cd8208c6d73b124cd2",
                src: "https://webcasting.bizconf.cn/show/videolink/mpr1aj2l/origin"
              },
              {
                time: "18:05-18:40",
                topic: "华为发布全新明星产品：5G和AI加持的下一代Wi-Fi, 存储，全光网络和SmartLi UPS，以加速企业转型",
                speaker: {
                  name: "邱恒",
                  title: "华为企业BG全球Marketing总裁"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/d02a7858cb5247a0812323006aabce97",
                src: "https://webcasting.bizconf.cn/show/videolink/m4k6gk5o/origin"
              }
            ],
          },
          {
            day: "2502",
            active: "replay",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270265&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7BEA724029-198B-4967-A785-C56E93F7727E%7D",
            title: "IP技术菁英汇 2020：Wi-Fi 6改变企业 论坛",
            con: [{
                time: "21:30-21:55",
                topic: "Wi-Fi标准的进展和技术发展情况",
                speaker: {
                  name: "Osama Aboul-Magd",
                  title: "IEEE 802.11ax标准工作组主席"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/e358ea54bddf416bbd737f4a91f308dc",
                src: "https://webcasting.bizconf.cn/show/videolink/lrnezd6o/origin"
              },
              {
                time: "21:55-22:20",
                topic: "Wi-Fi 6改变企业",
                speaker: {
                  name: "Andre Kindness",
                  title: "Forrester首席分析师"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/152e1c18791741aa98f8c5887886157b",
                src: "https://webcasting.bizconf.cn/show/videolink/ob16x70m/origin"
              },
              {
                time: "22:20-22:40",
                topic: "华为创新科技构筑高品质无线园区",
                speaker: {
                  name: "Henning Czerny",
                  title: "德国企业网络解决方案销售部CTO"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/1d058b458e914f669c95b5f9fe23c3fb",
                src: "https://webcasting.bizconf.cn/show/videolink/o0n7d4rm/origin"
              },
              {
                time: "22:40-22:55",
                topic: "华为全无线数字化园区实践分享",
                speaker: {
                  name: "Daniele Mantovani",
                  title: "华为意大利企业业务部CTO"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/99237c9183e944ffb6604bf9a59e68a0",
                src: "https://webcasting.bizconf.cn/show/videolink/mepzxbbl/origin"
              },
              {
                time: "22:55-23:15",
                topic: "Wi-Fi在重点行业的应用和需求",
                speaker: {
                  name: "VICTOR JIMENEZ",
                  title: "华为西班牙企业业务CTO"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/61654ed93c754c71b0f40bb1c10c0bfd",
                src: "https://webcasting.bizconf.cn/show/videolink/mng5817l/origin"
              }
            ]
          },
          {
            day: "26",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270269&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/MaterialList?&id=%7B494EFABE-DEC8-4167-84F0-7FD416C5C140%7D",
            active: "replay",
            title: "数据存储论坛",
            con: [{
                time: "17:00-17:20",
                topic: "挖掘数据价值：5G时代存储解决方案",
                speaker: {
                  name: "Kendell Chilton",
                  title: "华为智能计算与数据CTO"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/oya6e9ro/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/1738cec4d4f9458d9a4d7516ee913fbc",
              },
              {
                time: "17:20-17:40",
                topic: "ESG技术评估：全闪存为最关键的业务提供超强性能，高可靠性，降低成本",
                speaker: {
                  name: "Tony Palmer",
                  title: "Enterprise Strategy Group高级IT校验分析师"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m4k6j4ko/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5d04fe3a25c24d9c9d74896170db0c26",
              },
              {
                time: "17:40-17:50",
                topic: "EATNC技术评估：全闪存和VMWare互联互通测试",
                speaker: {
                  name: "Carsten Rossenhoevel",
                  title: "EANTC AG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/maka020o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/76358ade6865453cb32762349149293b",
              },
              {
                time: "17:50-18:05",
                topic: "索尼：第三代基于光盘的数据存档存储的创新和应用",
                speaker: {
                  name: "Valter Corda",
                  title: "索尼欧洲ODA技术专家"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m31g8n0o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/29bcb8ad31ad49d6b7b48b1913699ac1",
              },
              {
                time: "18:05-18:20",
                topic: "发挥存储与AI的协同优势",
                speaker: {
                  name: "Dr. Hui Lei",
                  title: "华为云与大数据VP兼CTO"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/l8vda05o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5f1e4c384063406a85ca8655240d979a",
              },
              {
                time: "18:20-18:30",
                topic: "新商业模式：华为Flash Ever计划",
                speaker: {
                  name: "Dr. Ning Wu",
                  title: "华为存储首席架构师"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o6kpgn2m/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/57bcfe82027a44f5a76a57fe8afaf1cd",
              }
            ]
          },
          {
            day: "2701",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=278037&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/MaterialList?&id={76214CBE-D2F0-47E4-B8FD-D892802B4CCC}",
            active: "replay",
            title: "企业服务论坛",
            con: [{
                time: "17:00-17:15",
                topic: "华为企业服务，数字化转型可信赖的服务专家",
                speaker: {
                  name: "华爽",
                  title: "华为企业BG企业技术服务部副总裁"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/og51kpgl/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/e970ca585c9a4e58bd13e2239ea1379b",
              },
              {
                time: "17:15-17:30",
                topic: "华为智能数据中心服务解决方案发布",
                speaker: {
                  name: "Hank Stokbroekx ",
                  title: "华为企业BG企业技术服务部副总裁"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o03abd3o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/aa75b5f83d49449081b1361d8c893486",
              },
              {
                time: "17:30-17:40",
                topic: "华为ICT学院2.0计划发布",
                speaker: {
                  name: "Hank Stokbroekx",
                  title: "华为企业BG企业技术服务部副总裁"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/og51kyrl/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/1cf1a052b40e471ca3b59e8fa4090016",
              }
            ]
          },
          {
            day: "2702",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=278046&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7BE9470119-02E8-4B6A-8D0C-026E00BEF3E5%7D",
            active: "replay",
            title: "多租户数据中心（MTDC）论坛",
            con: [{
                time: "21:00-21:25",
                topic: "互联网行业生态与趋势",
                speaker: {
                  name: "邓江",
                  title: "华为企业BG ISP行业业务总监"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mazb2j0o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5daca321459947b4b30d2b675834690d",
              },
              {
                time: "21:25-21:45",
                topic: "人工智能和混合云重塑多租户数据中心架构",
                speaker: {
                  name: "黄瑾",
                  title: "华为Cloud&AI 产品与服务副总裁"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lrg243am/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/dc91e2d47a8d41b1b9491282aa2264ac",
              },
              {
                time: "21:45-22:10",
                topic: "引领智能数据中心创新之路",
                speaker: {
                  name: "SanJay kr Sainani",
                  title: "全球数据中心副总裁&CTO"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o9g6en5l/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/068599dc27334b4e98d370b5dac43038",
              },
              {
                time: "22:10-22:20",
                topic: "DC OptiX，照亮数据中心高速互联",
                speaker: {
                  name: "Maxim Kuschnerov ",
                  title: "华为光与量子通信实验室主管"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/og51zrel/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/4de4e83eb3134f718c2bfcc01f608c9a",
              },
              {
                time: "22:20-22:35",
                topic: "新产品方案发布 FusionDC2.0, FusionPower2.0 100kVA功率模块",
                speaker: {
                  name: "",
                  title: "https://e.huawei.com/en/material/enterprise/e03aa0780d39491293c20603e256fcdf"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lkrnzdam/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/e03aa0780d39491293c20603e256fcdf",
              }
            ]
          },
        ],
        "en": [{
            day: "24",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270257&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7BB1AA7BC5-D4B8-418B-83CA-81C2E413BC2C%7D",
            title: "Keynote 1: Industrial Digital Transformation",
            active: "replay",
            con: [{
                time: "10:00-10:20",
                topic: "New Connectivity,  Computing, Platform, and Ecosystem Towards the Intelligent World 2030",
                speaker: {
                  name: "Ma Yue",
                  title: "Vice President, Huawei Enterprise Business Group"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o6kpynem/origin"
              },
              {
                time: "10:20-10:45",
                topic: "Digital Transformation in Government",
                speaker: {
                  name: "Dr. Aladdin D. Rillo",
                  title: "Deputy Secretary-General for ASEAN Economic Community"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mng5427l/origin"
              },
              {
                time: "10:45-11:00",
                topic: "Digital Transformation in Transportation",
                speaker: {
                  name: "Zhang Lixuan",
                  title: "Director of Digitalization, Shenzhen Baoan International Airport Group"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o914k0nl/origin"
              },
              {
                time: "11:00-11:30",
                topic: "Digital Transformation in Finance",
                speaker: {
                  name: "Chen Kun Te",
                  title: "Former CIO of China Merchants Bank and currently Chief Digital Transformation Officer, Global Financial Services, Huawei Enterprise Business Group"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lkpb36ao/origin"
              },
              {
                time: "11:30-11:50",
                topic: "Digital Transformation in Energy",
                speaker: {
                  name: "Liu Jianming",
                  title: "Secretary of CIGRE D2, Chinese National Committee"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mng54y8l/origin"
              }
            ]
          },
          {
            active: "replay",
            day: "2501",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270261&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7B6EFCF035-766B-4E4A-AB95-6AB0438D427E%7D",
            title: "Keynote 2: 2020 Huawei Enterprise BG Star Products and Flagship Solutions Launch",
            con: [{
                time: "10:00-10:30",
                topic: "Huawei Launches HiCampus Solution to Redefine Campuses",
                speaker: {
                  name: "Sun Fuyou",
                  title: "Vice President of Huawei Enterprise BG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m3kaby0l/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/43e97f9b0b7049b7a1318a9f09807017",
              },
              {
                time: "10:30-11:05",
                topic: "Huawei Launches HiDC Solution to Redefine Data Centers",
                speaker: {
                  name: "Wing Kin Leung",
                  title: "CTO of Huawei Enterprise BG"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/894e77ce7b6749cd8208c6d73b124cd2",
                src: "https://webcasting.bizconf.cn/show/videolink/o17j31go/origin"
              },
              {
                time: "11:05-11:40",
                topic: "Huawei Star Products Launch",
                speaker: {
                  name: "Qiu Heng",
                  title: "President of Global Marketing, Huawei Enterprise BG"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/d02a7858cb5247a0812323006aabce97",
                src: "https://webcasting.bizconf.cn/show/videolink/o0n7yn9m/origin"
              }
            ],
          },
          {
            active: "replay",
            day: "2502",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270267&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/materiallist?&id=%7BEA724029-198B-4967-A785-C56E93F7727E%7D",
            title: "Rethink IP Session",
            con: [{
                time: "14:30-14:55",
                topic: "Wi-Fi Standard Progress and Prospects",
                speaker: {
                  name: "Osama Aboul-Magd",
                  title: " Chair of IEEE 802.11ax Working Group"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/e358ea54bddf416bbd737f4a91f308dc",
                src: "https://webcasting.bizconf.cn/show/videolink/lja348dl/origin"
              },
              {
                time: "14:55-15:20",
                topic: "Wi-Fi 6 is Transforming Every Digital Enterprise",
                speaker: {
                  name: "Andre Kindness",
                  title: "Principal Analyst, Forrester"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/152e1c18791741aa98f8c5887886157b",
                src: "https://webcasting.bizconf.cn/show/videolink/mpr172nl/origin"
              },
              {
                time: "15:20-15:40",
                topic: "Building a High-Quality Wireless Campus with Huawei Innovative Technologies",
                speaker: {
                  name: "Henning Czerny",
                  title: "Vice Director of Germany Enterprise Network Solution Sales Department， European Region"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/1d058b458e914f669c95b5f9fe23c3fb",
                src: "https://webcasting.bizconf.cn/show/videolink/odkp422l/origin"
              },
              {
                time: "15:40-15:55",
                topic: "Huawei All-Wireless Digital Campus Practice Sharing",
                speaker: {
                  name: "Daniele Mantovani",
                  title: "CTO of Italy Enterprise Business Department"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/99237c9183e944ffb6604bf9a59e68a0",
                src: "https://webcasting.bizconf.cn/show/videolink/oya64bro/origin"
              },
              {
                time: "15:55-16:15",
                topic: "Wi-Fi Use Cases in Key Industries",
                speaker: {
                  name: "VICTOR JIMENEZ",
                  title: "CTO of Spain Enterprise Business Department"
                },
                downHref: "https://e.huawei.com/en/material/enterprise/61654ed93c754c71b0f40bb1c10c0bfd",
                src: "https://webcasting.bizconf.cn/show/videolink/lrnejpao/origin"
              }
            ]
          },
          {
            active: "replay",
            day: "26",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=270270&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/MaterialList?&id=%7B494EFABE-DEC8-4167-84F0-7FD416C5C140%7D",
            title: "Data Storage Session (Huawei 5G-era Storage Solution Powered By AI)",
            con: [{
                time: " 10:00-10:20",
                topic: "Discovering Data Value: Huawei 5G-era Storage Solution",
                speaker: {
                  name: "Kendell Chilton",
                  title: "CTO of Intelligent Data&Storage Domain, Huawei"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m23g474o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/1738cec4d4f9458d9a4d7516ee913fbc",
              },
              {
                time: "10:20-10:40",
                topic: "ESG Technical Review: Huawei OceanStor Dorado All-Flash  — Extreme Performance, Full Reliability Assurance, and Lower TCO for Your Most Critical Services",
                speaker: {
                  name: "Tony Palmer",
                  title: "Senior IT Validation Analyst at Enterprise Strategy Group"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lrnek2do/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5d04fe3a25c24d9c9d74896170db0c26",
              },
              {
                time: "10:40–10:50",
                topic: "EANTC Technical Review: Huawei OceanStor Dorado All-Flash and VMWare Interoperability Test",
                speaker: {
                  name: "Carsten Rossenhoevel",
                  title: "CTO of EANTC AG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m3ka3n6l/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/76358ade6865453cb32762349149293b",
              },
              {
                time: "10:50-11:05",
                topic: "Sony: Innovation and Application of 3rd-Gen Optical Disc-Based Storage for Data Archiving",
                speaker: {
                  name: "Valter Corda",
                  title: "Sony Europe ODA technical specialis"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mx9xb7dm/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/29bcb8ad31ad49d6b7b48b1913699ac1",
              },
              {
                time: "11:05-11:20",
                topic: "Exploiting the Synergy Between Storage and AI",
                speaker: {
                  name: "Dr. Hui Lei",
                  title: "VP and CTO, Cloud and Big Data, Huawei"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lkpby20o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5f1e4c384063406a85ca8655240d979a",
              },
              {
                time: "11:20–11:30",
                topic: "New Business Model: Huawei “Flash Ever” Program",
                speaker: {
                  name: "Dr. Ning Wu",
                  title: "Principal Architect, Intelligent Data&Storage Domain, Huawei"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mpr16d8l/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/57bcfe82027a44f5a76a57fe8afaf1cd",
              }
            ]
          },
          {
            active: "replay",
            day: "2701",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=278033&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/MaterialList?&id={76214CBE-D2F0-47E4-B8FD-D892802B4CCC}",
            title: "Enterprise Service Session: Trusted Services for Digital Transformation",
            con: [{
                time: "10:00-10:15",
                topic: "Trusted Service, Drive Digital Transformation",
                speaker: {
                  name: "Hua Shuang",
                  title: "Vice President of Enterprise Service, Huawei Enterprise BG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/o03abxvo/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/e970ca585c9a4e58bd13e2239ea1379b",
              },
              {
                time: "10:15-10:30",
                topic: "Huawei Intelligent DC Service Solution Launch",
                speaker: {
                  name: "Hank Stokbroekx ",
                  title: "Vice President of Enterprise Service, Huawei Enterprise BG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lrg2r56m/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/aa75b5f83d49449081b1361d8c893486",
              },
              {
                time: "10:30-10:40",
                topic: "Huawei ICT Academy Program V2.0 Launch",
                speaker: {
                  name: "Hank Stokbroekx",
                  title: "Vice President of Enterprise Service, Huawei Enterprise BG"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m21xr7jl/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/1cf1a052b40e471ca3b59e8fa4090016",
              }
            ]
          },
          {
            active: "replay",
            day: "2702",
            iframe: "https://webcasting.bizconf.cn/?a=index&c=show&id=278042&type=mobile&playerInlineMode=1",
            hrefBtn: "https://e.huawei.com/en/material/MaterialList?&id=%7BE9470119-02E8-4B6A-8D0C-026E00BEF3E5%7D",
            title: "Multi-Tenant Data Center (MTDC) Session (AI and Hybrid Cloud  Reshape MTDC Infrastructure)",
            con: [{
                time: "14:00-14:25",
                topic: "Internet Industry Ecosystem & Trend",
                speaker: {
                  name: "Deng Jiang",
                  title: "GM, ISP Global Business, Huawei"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/od50z62l/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/5daca321459947b4b30d2b675834690d",
              },
              {
                time: "14:25-14:45",
                topic: "AI and Hybrid Cloud Reshape Multi-Tenant Data Center Infrastructure",
                speaker: {
                  name: "Joy Huang",
                  title: "VP，Cloud & AI Product & Service, Huawei"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/mazb2d0o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/dc91e2d47a8d41b1b9491282aa2264ac",
              },
              {
                time: "14:45-15:10",
                topic: "Leading the Way in Smart Data Center Innovation",
                speaker: {
                  name: "SanJay kr Sainani",
                  title: "SVP & CTO, Huawei Global DC Facility Business"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/lrg24nam/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/068599dc27334b4e98d370b5dac43038",
              },
              {
                time: "15:10-15:20",
                topic: "DC OptiX, Enlighting High-speed Data Center Interconnection",
                speaker: {
                  name: "Maxim Kuschnerov ",
                  title: "Director, Huawei Optical and Quantum Communication Laboratory"
                },
                src: "https://webcasting.bizconf.cn/show/videolink/l81gev3o/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/4de4e83eb3134f718c2bfcc01f608c9a",
              },
              {
                time: "15:20-15:35",
                topic: "New Product & Solution Launch(FusionDC2.0 and FusionPower2.0 100kVA Power Module)",
                speaker: {
                  name: "",
                  title: ""
                },
                src: "https://webcasting.bizconf.cn/show/videolink/m71pekym/origin",
                downHref: "https://e.huawei.com/en/material/enterprise/e03aa0780d39491293c20603e256fcdf",
              }
            ]
          },
        ],
      }
    },
    active: function (el) {
      el.siblings().removeClass("active").end().addClass("active");
    },
    chlidAgenda: function (active) {
      //active:状态
      // if (!active) return;
      //右侧跟视频走的议程 子议程
      var objCon = {};
      var objBtn = {};
      var dom = '';
      var btnDom = '';
      var eventlbl = '';
      $.each(switchWin.data["agenda"][lang], function (i, v) {
        // if (v["active"] == "" || v["active"] == "coming soon") return true;
        eventlbl = v["title"];
        $.each(v["con"], function (index, value) {
          dom += '<li class="li" data-src="' +
            value["src"] + '">' +
            '<div class="time">' + value["time"] + '</div>' +
            '<p class="p">' + value["topic"] + '</p>' +
            '<a  target="_blank" class="down utag-click J-btn" href="' +
            value["downHref"] + '" data-eventcat="MWC2020" data-eventact="material_download" data-eventlbl="' +
            value["topic"] + '"><i class="icon-xiazai1 iconfont"></i>' +
            btnText["replay"][lang] + '</a>' +
            '</li>';
        })
        btnDom += '<a target="_blank" class="downBtn J-btn utag-click"  data-eventcat="MWC2020" data-eventact="material_download" data-eventlbl="' +
          eventlbl + '" href="' +
          v["hrefBtn"] + '">' + btnText[v["active"]][lang] + '</a>';
        objCon[v["day"]] = dom;
        objBtn[v["day"]] = btnDom;
        dom = '';
        btnDom = '';
      });
      return {
        objCon: objCon,
        objBtn: objBtn
      };
    },
    tabClick: function () {
      var objCon = this.chlidAgenda().objCon;
      var objBtn = this.chlidAgenda().objBtn;
      var btn = $(".video-play-list .btn");
      var btnWap = $(".video-play-command .btn");
      var title = $(".video-play-list .title");
      var listBox = $(".video-play-list .box");
      var liClass = "";
      var flag = true;
      commandUl.on("click", ".li", function () {
        var $this = $(this);
        if (!($this.hasClass("play") || $this.hasClass("replay"))) {
          return
        };
        var text = $this.find(".text").text();

        if ($this.data("day")) {
          //根据day 来插入dom结构
          listUl.html(objCon[$this.data("day")])
        }

        //直播判断
        if ($this.hasClass("play")) {
          //直播
          liClass = "play";
          listBox.removeClass("replay");
          title.text(text);
        } else if ($this.hasClass("replay")) {
          //录播
          liClass = "replay";
          listBox.addClass("replay");
          title.text(btnText["replayTitle"][lang])
          if (globalWinw <= 768) {
            listUl.width((listUl.find(".li").length) * 210);
          }

          if ($this.data("day")) {
            //根据day 来插入dom结构
            btnBox.html(objBtn[$this.data("day")])
          }

          switchWin.chlidClick();
          //触发点击第一个子录播
          setTimeout(function () {
            var first = $(".video-play-list .replay").find(".li:nth-child(1)");
            if (first.data("src")) {
              first.trigger("click");
            } else {
              $(".video-play-list .replay").find(".li:nth-child(2)").trigger("click");;
            }
            // $(".video-play-list .replay").find(".li:nth-child(1)").trigger("click");
          }, 500)
        }

        var index = ($this.index() - 1);
        if (globalWinw <= 768 && flag) {
          commandUl.scrollLeft(index * 210);
          flag = false;
        }

        //按钮的链接
        if ($this.data("href")) {
          btn.attr("href", $this.data("href"));
          btnWap.attr("href", $this.data("href"));
        }

        //iframe的地址
        if ($this.data("src")) {
          iframe.attr("src", $this.data("src"));
        }

        //按钮的链接
        if (liClass) {
          btn.text(btnText[liClass][lang]);
          btnWap.text(btnText[liClass][lang]);
          liClass = "";
        }

        switchWin.active($this);
      })

    },
    chlidClick: function () {
      $(".video-play-list .replay").off("click", ".li").on("click", ".li", function () {
        var $this = $(this);
        if ($this.hasClass("last")) {
          return;
        }

        if ($this.data("src")) {
          iframe.attr("src", $this.data("src"));
          switchWin.active($this);
        }
      })
    },

  }




  switchWin.init();


  // ==S header

  var divs=$(".index-main").find(".contents");
  var navLis=$("#pc-nav").find("ul").find("li");
  if(globalWinw>1000){
    $(document).scroll(function(){
      var scrollT = $(document).scrollTop();
      if(scrollT==0){
        $(".header").css("background","transparent")
        $(".header").css("border-bottom","none")  
    
      }else{
        $(".header").css("background","white")
        $(".header").css("border-bottom","1px solid #e2e2e2")  
      };
      })
  }

 
  // navLis.on("click",function(){
  //   $(this).addClass("active").siblings().removeClass("active");
  //   var index=$(this).index();
  //   var H=divs[index+3].offsetTop;
  //   $('html,body').stop().animate({
  //     'scrollTop': H
  //   },300);
  // });


  if(globalWinw<=1000){
    var flag=true;
    var wrapLis=$(".menue-wrap").find("li");
    wrapLis.on("click",function(){
      $(this).addClass("active")
      $(this).siblings().removeClass("active");
      $(".menue-wrap").slideToggle();
      flag2=!flag2;
      $(".wap_navbtn").removeClass("close");

      var index=$(this).index();
      var H=divs[index].offsetTop-50;
      $('html,body').animate({
        scrollTop: H
      }, 500);
    });
    var flag2=true;
    $(".wap_navbtn").on("click",function(){
      var wHeight=$(window).height();
      $(".menue-wrap").css("height",wHeight)
      if(flag2){
        $(this).removeClass("close");
        $(".menue-wrap").slideDown();
        flag2=!flag2;
      }
      else{
        $(this).addClass("close");
      
        $(".menue-wrap").slideUp();
        flag2=!flag2;
      }
    })
  }

//   $('a[href*=#],area[href*=#]').click(function() {
//     if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
//         var $target = $(this.hash);
//         $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
//         if ($target.length) {
//             var targetOffset = $target.offset().top;
//             $('html,body').animate({
//                 scrollTop: targetOffset
//             }, 500);
//             return false;
//         }
//     }
// });



  // ==E header

  // ==S banner
  if (globalWinw > 768) {
    // $('.banner-v2').height($('.conference-int-v2 .pic img').height());
    $('.conference-int-v2 .pic img').css('marginTop', -$(window).height());
  }

  function bannerInit(options) {
    var obj = $(options.obj),
      winw = $(window).width(),
      winh = $(window).height();
    if ((winw / winh) > (options.proportion)) {
      // 当视频100%显示的时候，视频高度比浏览器尺寸高
      obj.css({
        'top': -(winw / options.proportion - winh) / 2,
        'width': '100%'
      });
    } else {
      // 当视频100%显示的时候，视频高度比浏览器尺寸低
      obj.css({
        'left': -(winh * options.proportion - winw) / 2,
        'height': '100%',
        'width': 'auto'
      });
    }
  }
  if (globalWinw > 768) {
    bannerInit({
      obj: '.banner .video video',
      proportion: 1920 / 1080
    });
  } else {
    // bannerInit({
    //     obj: '.banner .video .pic img',
    //     proportion: 750 / 1333
    // });
  }

  var resizeTimer = null;
  $(window).on("resize.banner", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (globalWinw > 768) {
        // bannerInit({
        //     obj: '.video video',
        //     proportion: 1920 / 1080
        // });

        // ==S banner
        if (globalWinw > 768) {
          // $('.banner-v2').height($('.conference-int-v2 .pic img').height());
          $('.conference-int-v2 .pic img').css('marginTop', -$(window).height());
        }
      }
    }, 200);
  })

  // banner文字动画
  // function indexBannerAnimated() {
  //     if (globalWinw > 1200) {
  //         $('.banner .con .cistern .text h1').addClass('animated bounceInUp');
  //         $('.banner .con .cistern .text p').addClass('animated bounceInUp');
  //         $('.banner .con .cistern .text span').addClass('animated bounceInUp');
  //         setTimeout(function () {
  //             $('.banner .con .cistern .text a').addClass('animated bounceInUp');
  //         }, 150)
  //     }
  // }
  function indexBannerAnimatedV2() {
      if (globalWinw > 768) {
          $('.kv_content').addClass('animated bounceInUp');
          $('.cube_box').addClass('animated bounceInUp');
          setTimeout(function () {
              $('.go_live').addClass('animated bounceInUp');
          }, 350)
      }
  }
  indexBannerAnimatedV2();
  // function indexBannerAnimatedV2() {
  //   if (globalWinw > 1200) {
  //     $('.banner-v2 .con .cistern .text h1').addClass('animated bounceInUp');
  //     $('.banner-v2 .con .cistern .text p').addClass('animated bounceInUp');
  //     $('.banner-v2 .con .cistern .text span').addClass('animated bounceInUp');
  //     setTimeout(function () {
  //       $('.banner-v2 .con .cistern .text a').addClass('animated bounceInUp');
  //     }, 150)
  //   }
  // }
  // ==E banner


  // ==S Conference Introduction
  var boxRight = 0;
  $(".conference-int-v2-popup").on("click", function () {
    var showClass = "." + $(this).data("vaule");
    (showClass && showClass == ".map-reveal-module") && $(showClass).addClass("map-reveal-module-bg");

    var nowscroll_length = $(document).scrollTop();
    $("body").addClass("position-fix").css("margin-top", -nowscroll_length);
    $(showClass).fadeIn("fast").css("overflow-y", "auto");
  });

  $(".conference-int-v2-clock").on("click", function (event) {
    var e = event || window.event;
    e.stopPropagation();
    var nowscroll_length = Math.abs(parseInt($("body").css("margin-top")));
    $("body").removeClass("position-fix").css("margin-top", 0);
    $("html,body").scrollTop(nowscroll_length);
    $(this).parents(".prompt-box").fadeOut("fast");
  });
  if (globalWinw > 1200) {
    var conferenceIntPopObj = $('.conference-int-v2-pop');
    var conferenceIntCloseObj = conferenceIntPopObj.find('.close');
    var boxCloseOff = false;
    $('.conference-int-v2-pop').on('scroll.pop', function () {
      var closeTop = conferenceIntPopObj.scrollTop();
      if (closeTop > 30) {
        if (boxCloseOff == false) {
          boxCloseOff = true;
          boxRight = ($('.conference-int-v2-pop').width() - $('.conference-int-v2-pop .cistern').width()) / 2 + 50 + 9;
          conferenceIntCloseObj.css({
            'position': 'fixed',
            'top': '30px',
            'right': boxRight
          });
        }
      } else {
        if (boxCloseOff == true) {
          boxCloseOff = false;
          conferenceIntCloseObj.css({
            'position': 'absolute',
            'top': '30px',
            'right': '50px'
          });
        }
      }
    })
  }
  // 图片动画
  // if (globalWinw > 1200) {
  //   var conferenceIntAnimate = $('.conference-int-v2');
  //   $(window).on("scroll.conference-int-v2", function () {
  //     if (conferenceIntAnimate.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
  //       $('.conference-int-v2-animate').addClass('animated zoomIn');
  //       setTimeout(function () {
  //         $('.conference-int-v2 .right h2').addClass('animated bounceInUp');
  //         setTimeout(function () {
  //           $('.conference-int-v2 .right > p').addClass('animated bounceInUp');
  //           setTimeout(function () {
  //             $('.conference-int-v2 .right a').addClass('animated bounceInUp');
  //           }, 400)
  //         }, 250)
  //       }, 150)
  //     }
  //   })
  // }

  // agenda
  if (globalWinw > 768) {
    var agenda_box_obj = $('.agenda_box');
    $(window).on("scroll.agenda_box", function () {
      if (agenda_box_obj.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
        setTimeout(function () {
          $('.agenda_box .agenda_title').addClass('animated bounceInUp');
          setTimeout(function () {
            $('.agenda_box .agenda_date').addClass('animated bounceInUp');
            setTimeout(function () {
              $('.agenda_box .agd_all').addClass('animated bounceInUp');
            }, 400)
          }, 250)
        }, 150)
      }
    })
  }

  // guest
  if (globalWinw > 768) {
    var agenda_box_el = $('.guest_box');
    $(window).on("scroll.guest_box", function () {
      if (agenda_box_el.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
        setTimeout(function () {
          $('.guest_box .agenda_title').addClass('animated bounceInUp');
          setTimeout(function () {
            $('.guest_box .guest_img').addClass('animated bounceInUp');
          }, 250)
        }, 150)
      }
    })
  }

  // more
  if (globalWinw > 768) {
    var formore_box_el = $('.formore_box');
    $(window).on("scroll.guest_box", function () {
      if (formore_box_el.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
        setTimeout(function () {
          $('.formore_box .agenda_title').addClass('animated bounceInUp');
          setTimeout(function () {
            $('.formore_box .formore_link').addClass('animated bounceInUp');
          }, 250)
        }, 150)
      }
    })
  }


  // if (globalWinw > 1200) {
  //   var conferenceIntAnimate = $('.conference-int-v2');
  //   $(window).on("scroll.conference-int-v2", function () {
  //     if (conferenceIntAnimate.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
  //       $('.conference-int-v2-animate').addClass('animated zoomIn');
  //       setTimeout(function () {
  //         $('.conference-int-v2 .right h2').addClass('animated bounceInUp');
  //         setTimeout(function () {
  //           $('.conference-int-v2 .right > p').addClass('animated bounceInUp');
  //           setTimeout(function () {
  //             $('.conference-int-v2 .right a').addClass('animated bounceInUp');
  //           }, 400)
  //         }, 250)
  //       }, 150)
  //     }
  //   })
  // }
  // ==E Conference Introduction

  // ==S highlights
  function highlightsSwiper() {
    var winw = $(window).width();
    if (winw > 1600) {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 20,
      })
    } else if (winw > 1200) {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
      })
    } else if (winw > 768) {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
      })
    } else {
      var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationType: 'progress',
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesPerView: 1.2,
        slidesPerGroup: 1,
        spaceBetween: 10,
        loopAdditionalSlides: 1,
      })
    }
  }
  highlightsSwiper();




  //agenda
  var tab = $(".agenda .tab");
  setTimeout(function () {
    var agendaUl = new Swiper('.agenda .swiper-ul', {
      autoHeight: true,
      onSlideChangeEnd: function (swiper) {
        switchWin.active(tab.find(".li").eq(swiper.activeIndex));
      }
    });

    tab.on("click", ".li", function () {
      var $this = $(this);
      agendaUl.slideTo($this.index(), 400, false);
      switchWin.active($this);
    })
  })

  //---------------
  // tab.find(".li:nth-child(1)").trigger("click");

  var speaker = $(".speaker");
  if (speaker.length > 0) {
    $(window).on("scroll.speaker", function () {
      if (speaker.offset().top < ($(window).height() + $(window).scrollTop() - 300)) {
        $('.speaker h2').addClass('animated bounceInUp');
        setTimeout(function () {
          setTimeout(function () {
            $('.speaker .speaker-con').addClass('animated bounceInUp');
          }, 150)
        }, 150)
      }
    })
  }

  if (globalWinw > 768) {
    new Swiper('.speaker .swiper-ul', {
      autoHeight: true,
      pagination: '.speaker .pagination-ul',
      // paginationType: 'progress',
      prevButton: '.speaker .arrow-prev',
      nextButton: '.speaker .arrow-next',
      paginationClickable: true,
      slidesPerView: 4,
      slidesPerGroup: 4,
      spaceBetween: 20,
      loop: false,
      breakpoints: {
        1200: {
          slidesPerView: 3
        }
      }
    });
  } else {
    new Swiper('.speaker .swiper-wap', {
      autoHeight: true,
      pagination: '.speaker .pagination-ul',
      slidesPerView: 1,
      spaceBetween: 20
    });
  }
  baseLib.v3SetHeight(".video-play-command .ul", ".li", ".text", 768);







  $(".index-main").on("click", ".J-anchor", function (e) {
    e.stopPropagation();
    $("body,html").scrollTop($(".agenda").offset().top);
  })

  // 计算每个块的文字高度
  function highlightsTextH() {
    var highlightsH = 0;
    var obj = $('.highlights .con .swiper-container .box .text')
    obj.height('auto')
    obj.each(function () {
      if ($(this).height() > highlightsH) {
        highlightsH = $(this).height();
      }
    });
    obj.height(highlightsH);
  }
  setTimeout(function () {
    // highlightsTextH();
  }, 500)
  // 动画

  // if (globalWinw > 1200) {
  //   var highlightsAnimate = $('.highlights');
  //   $(window).on("scroll.highlightsAnimate", function () {
  //     if (highlightsAnimate.offset().top < ($(window).height() + $(window).scrollTop() - 400)) {
  //       if (!$('.highlights video').hasClass('true')) {
  //         $('.highlights video').addClass('true');
  //         $('.highlights video').attr('src', '../video/highlights.mp4');
  //       }
  //       if ($('.highlights .con .swiper-container .swiper-slide').css('opacity') == 0) {
  //         $('.highlights .con .swiper-container .swiper-slide:nth-child(1)').addClass('animated bounceInRight');
  //         $('.highlights .con .title h2').addClass('animated bounceInUp');
  //         $('.highlights .con .title a').addClass('animated bounceInUp');
  //         setTimeout(function () {
  //           $('.highlights .con .swiper-container .swiper-slide:nth-child(2)').addClass('animated bounceInRight');
  //           setTimeout(function () {
  //             $('.highlights .con .swiper-container .swiper-slide').addClass('animated bounceInRight');
  //             setTimeout(function () {
  //               $('.highlights .con .swiper-container .swiper-slide').css('opacity', 1).removeClass('animated bounceInRight');
  //               highlightsTextH();
  //             }, 400)
  //           }, 150)
  //         }, 100)
  //       }
  //     }

  //     // yun-img1动画
  //     if (highlightsAnimate.offset().top < ($(window).height() + $(window).scrollTop())) {
  //       highlightsAnimate.find('.yun-img1').css('top', -($(window).scrollTop() + $(window).height() - highlightsAnimate.offset().top) / 4 + 50)
  //     }
  //   })
  // }

  // 图片懒加载
  // $(window).on("scroll.highlightsLazyload", function () {
  //   if ($('.highlights').offset().top < ($(window).height() + $(window).scrollTop())) {
  //     $('.highlights .con .swiper-container .box .pic img').each(function () {
  //       $(this).attr('src', $(this).attr('data-original'));
  //       $(this).parent().addClass('over');
  //     })
  //     $(window).unbind("scroll.highlightsLazyload");
  //   }
  // })

  // ==E highlights




  // ==S open speech
  function TabSwicth(option) {

    // 默认参数
    this.defaultOption = {
      tabBox: '.j-tab-box',
      tabBth: '.j-tab-btn',
      tabList: '.j-tab-list',
      active: 0
    }

    // 初始化
    this._init(option)
  }
  TabSwicth.prototype._init = function (option) {
    // 合并参数
    this.tabBox = $(option !== undefined && option.tabBox !== undefined ? option.tabBox : this.defaultOption.tabBox)
    this.tabBth = $(option !== undefined && option.tabBth !== undefined === undefined ? option.tabBth : this.defaultOption.tabBth)
    this.tabList = $(option !== undefined && option.tabList !== undefined ? option.tabList : this.defaultOption.tabList)

    // 默认显示第一个
    this.tabBth.eq(this.defaultOption.active).addClass('active')
    this.tabList.eq(this.defaultOption.active).addClass('active')

    //事件
    this._event()
  }
  TabSwicth.prototype._event = function () {
    var _this = this
    this.tabBth.on('click', function (element) {
      var activeThis = $(this);
      activeThis.addClass('active').siblings().removeClass('active')
      // activeThis.parents(_this.defaultOption.tabBox).find(_this.defaultOption.tabList).eq(activeThis.index()).addClass('active').siblings().removeClass('active')

      mySwiperOpenSpeechClick(activeThis.index())
    })
  }


  // 调用
  var tabswicth = new TabSwicth()

  // 光标hover效果
  $('.open-speech .con .head .btn-text').hover(function () {
    if (!$(this).parents('.j-tab-btn').hasClass('acitve')) {
      $(this).parents('.j-tab-btn').addClass('active')
    }
  }, function () {
    if ($(this).parents('.j-tab-box').find('.j-tab-btn.active').length > 1) {
      $(this).parents('.j-tab-btn').removeClass('active')
    }
  })


  function swiperContainerOpenSpeech() {
    var winw = $(window).width();
    if (winw > 768) {
      var mySwiperOpenSpeech = new Swiper('.swiper-container-open-speech', {
        slidesPerView: 1,
        pagination: '.swiper-pagination',
        paginationClickable: true,
      })
    }
  }
  swiperContainerOpenSpeech();

  function mySwiperOpenSpeechClick(_index) {

    $('.swiper-pagination-bullet').eq(_index).trigger('click');
  }



  // ai-img1动画
  // if (globalWinw > 1200) {
  var openSpeech = $('.open-speech');
  if (openSpeech.length > 0) {
    $(window).on("scroll.open-speech", function () {
      if (openSpeech.offset().top < ($(window).height() + $(window).scrollTop() - 300)) {
        $('.open-speech .label').addClass('animated bounceInUp');
        setTimeout(function () {
          $('.open-speech h2').addClass('animated bounceInUp');
          setTimeout(function () {
            // $('.open-speech .con .head').addClass('animated bounceInUp');
            $('.open-speech .agenda-con .tab').addClass('animated bounceInUp');
            setTimeout(function () {
              $('.open-speech .agenda-con .content').addClass('animated bounceInUp');
              $('.open-speech .con .tab-con .box .left span').addClass('animated bounceInUp');
              $('.open-speech .con .tab-con .box .right').addClass('animated bounceInUp');
              setTimeout(function () {
                $('.open-speech .con .tab-con .box .left h3').addClass('animated bounceInUp');
                setTimeout(function () {
                  $('.open-speech .con .tab-con .box .left p').addClass('animated bounceInUp');
                }, 200)
              }, 200)
            }, 200)
          }, 150)
        }, 150)
      }

      if (openSpeech.offset().top < ($(window).height() + $(window).scrollTop())) {
        openSpeech.find('.ai-img1').css('top', -($(window).scrollTop() + $(window).height() - openSpeech.offset().top) / 4 + 50)
      }
    })
  }
  // }
  // ==E open speech



  // ==S register-to-get
  function registerToGet() {
    if (globalWinw > 1200) {
      setTimeout(function () {
        var obj = $('.register-to-get .text')
        obj.css('display', 'block').addClass('animate')
        setTimeout(function () {
          obj.removeClass('animate')
          setTimeout(function () {
            obj.css('display', 'none')
          }, 400)
        }, 5000)
      }, 2000)
    }
  }
  var obj = $('.register-to-get .text')
  $('.register-to-get').hover(function () {
    obj.css('display', 'block')
    setTimeout(function () {
      obj.addClass('animate')
    }, 100)
  }, function () {
    obj.removeClass('animate')
    setTimeout(function () {
      obj.css('display', 'none')
    }, 400)
  })
  // ==E register-to-get


  //  ==S图片滑动
  var gap = $(".img-box").find("li").css("margin-right");
  var picture = $('.img-box');
  var ul = $('.img1', picture);
  var lis = $('li', ul);
  var li = $('li', ul).width() + parseInt(gap);


  var tt = document.styleSheets[0];
  var styleEl = document.createElement('style');
  document.head.appendChild(styleEl);
  if (globalWinw >= 768) {
    // tt.insertRule("@keyframes move{ from {transform:translateX(0)} to {transform: translateX( "+(-li*5+1.8)+"px)}}");
    styleEl.sheet.insertRule("@keyframes move{ from {transform:translateX(0)} to {transform: translateX( " + (-li * 5 + 1.8) + "px)}}", 0);
  } else {
    // tt.insertRule("@keyframes move{ from {transform:translateX(0)} to {transform: translateX( "+(-li*5+2)+"px)}}");
    styleEl.sheet.insertRule("@keyframes move{ from {transform:translateX(0)} to {transform: translateX( " + (-li * 5 + 2) + "px)}}", 0);
  }
  ul.append(lis.slice(0, 5).clone());

  //底层滑动
  var picture2 = $('.img-box2');
  var ul2 = $('.img2', picture2);
  var lis2 = $('li', ul2);
  var li2 = $('li', ul2).width() + parseInt(gap);
  ul2.append(lis2.slice(0, 6).clone());
  ul2.append(lis2.slice(0, 1).clone());



  var styleEl2 = document.createElement('style');
  document.head.appendChild(styleEl2);
  if (globalWinw > 768) {
    styleEl2.sheet.insertRule("@keyframes moves{ from {transform:translateX(0)} to {transform: translateX( " + (-li * 6 + 1.8) + "px)}}", 0);
  } else {
    styleEl2.sheet.insertRule("@keyframes moves{ from {transform:translateX(0)} to {transform: translateX( " + (-li * 6 + 2.2) + "px)}}", 0);
  }

  ul2.append(lis.slice(0, 5).clone());
  var imgBox = $('.imgPlay');

  if (globalWinw > 1200 && imgBox.length) {
    $(window).on("scroll.imgPlay", function () {
      if (imgBox.offset().top < ($(window).height() + $(window).scrollTop() - 200)) {
        $('.imgPlay h2').addClass('animated bounceInUp');
        setTimeout(function () {
          $('.imgPlay .playbox').addClass('animated bounceInUp');
        }, 500)
      }
      $('.imgPlay .playbox img').each(function () {
        $(this).attr('src', $(this).attr('data-original'));
        $(this).parent().addClass('over');
      })
      $(window).unbind("scroll.highlightsLazyload");
    })
  }



  // ie兼容处理
  function isIE() { //ie?
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      return true;
    } else {
      return false;
    }
  }
  isIE();
  if (isIE() || globalWinw < 1200) {
    ul.find("li").css("animation", "none");
    ul2.find("li").css("animation", "none");

    function move() {
      ul.stop().animate({
        left: (-li * 5 + 1.8) + "px"
      }, 30000, "linear", function () {
        ul.css("left", "0");
        move()
      });
    }
    move()

    function move2() {
      ul2.stop().animate({
        left: (-li * 6 + 2) + "px"
      }, 35000, "linear", function () {
        ul2.css("left", "0");
        move2();
      });
    }
    move2();
  }
  // if (isIE()) {
  // $(".wheelPlay").find(".swiper-button-next2").find(".iconfont").css("top", "60%");
  // $(".wheelPlay").find(".swiper-button-prev2").find(".iconfont").css("top", "60%");
  // }

  //  ==E图片轮播



  // ==E图片轮播
  if (globalWinw <= 992) {
    var swiper = new Swiper('.swiper-container2', {
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: true,
      loop: false,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      prevButton: '.swiper-button-prev2',
      nextButton: '.swiper-button-next2',
    });
  } else {
    var swiper = new Swiper('.swiper-container2', {
      slidesPerView: 2,
      spaceBetween: -250,
      centeredSlides: true,
      loop: true,
      pagination: '.swiper-pagination',
      paginationClickable: true,
      prevButton: '.swiper-button-prev2',
      nextButton: '.swiper-button-next2',
      mousewheel: false,
    });
  }

  var wheelPlay = $(".wheelPlay");
  if (wheelPlay.length > 0) {
    $(window).on("scroll.wheelPlay", function () {
      if (wheelPlay.offset().top < ($(window).height() + $(window).scrollTop() - 300)) {
        $('.wheelPlay h2').addClass('animated bounceInUp');
        setTimeout(function () {
          setTimeout(function () {
            $('.wheelPlay .con').addClass('animated bounceInUp');
          }, 150)
        }, 150)
      }
    })
  }


  // ==S 视频选择

  var videoList=$(".video-box").find(".btnBox").find("li");
  var video=$(".video-box").find(".mudu-video");
  var videoUrl=["https://e-file.huawei.com/mediafiles/MarketingMaterial_MCD/EBG/PUBLIC/en/2020/04/8de4eccf-5f7e-44b9-ac14-761bf43d2628.mp4",
  "https://e-file.huawei.com/mediafiles/MarketingMaterial_MCD/EBG/PUBLIC/en/2020/04/f51833a6-39aa-479d-b2c3-c9731829721e.mp4",
  "https://e-file.huawei.com/mediafiles/MarketingMaterial_MCD/EBG/PUBLIC/en/2020/04/75d2d310-3038-497c-9fcd-aa2d6012e33b.mp4",
  "https://e-file.huawei.com/mediafiles/MarketingMaterial_MCD/EBG/PUBLIC/en/2020/04/b4125595-2c55-4b67-bb89-436e90637222.mp4",
  "https://e-file.huawei.com/mediafiles/MarketingMaterial_MCD/EBG/PUBLIC/en/2020/04/298f0591-f9ba-4324-96c2-f29bfc665763.mp4"
]
  videoList.on("click",function(){
    $(this).addClass("active");
    $(this).siblings().removeClass("active");
    var num=$(this).index();
    video.attr("src",videoUrl[num]);
  })

  // if(globalWinw<=768){
  //   var btnUl=$(".video-box").find(".btnBox");
  //   var h=parseInt($(btnUl).css("height"))-30;
  //   var w=parseInt($(videoList[0]).css("width"))*(videoList.length);
  //   btnUl.css("width",w+"px");
    // videoList.each(function(){
    //   $(this).css("height",h+"px");
    // })
  // }
  if(globalWinw>768){
    var btnUl=$(".video-box").find(".btnBox");
    var videoH=parseInt(video.css("height"))-50;
    btnUl.css("height",videoH+"px")
  }
})