var config = {
  website: {
    name: "智汇医圈",
    href: "http://www.nordata.cn",
    product_name: "智汇医圈-ClideSys决策支持系统",
    company_name: "苏州诺德拓生物科技有限公司",
    copyright: "©2017-2018 ",
    icp_num: "苏ICP备17025715号-4",
    address: "上海市杨浦区四平路2158号1305室（地铁五角场3号口）"
  },
  logoPath: require("../assets/img/logo.png"),
  headerContent: [
    {
      name: "Knowledge",
      route: "/knowledge"
    },
    {
      name: "Daily",
      route: "/daily"
    },
    {
      name: "Recommendataion",
      route: "/recommendation",
      show: false
    },
    {
      name: "Paper&Knowledge",
      children: [
        {
          name: "My Paper",
          route: "/papers/mypaper",
          role: "contributor",
          client: "pc"
        },
        {
          name: "Submit Paper",
          route: "/papers/submitter",
          role: "contributor",
          client: "pc"
        },
        {
          name: "Create Knowledge",
          route: "/papers/knowledge-creator",
          role: "contributor"
        },
        {
          name: "Create Daily",
          route: "/papers/daily",
          role: "editor",
          show: false
        },
        {
          name: "Knowledge List",
          route: "/papers/knowledges",
          role: "editor",
          client: "pc"
        }
      ]
    },
    {
      name: "Annotation",
      route: "/annotation"
    },
    {
      name: "About",
      route: "/about"
    },
    {
      name: "SIGN IN",
      route: "/auth"
    }
  ],
  footerContent: [
    {
      title: "Wechat/Website",
      span: 3,
      contentList: [
        {
          title: "智汇医圈Plus",
          src: require("../assets/img/genius-community-plus.png"),
          type: "image"
        },
        {
          title: "智汇医圈训练营",
          src: require("../assets/img/duanshu.png"),
          type: "image"
        }
      ]
    },
    {
      title: "临床决策服务",
      span: 5,
      contentList: [
        {
          title: "ClideSys临床决策支持系统",
          src: "",
          type: "link",
          target: ""
        },
        {
          title: "Swarm®肿瘤大数据分析平台",
          src: "https://iwmtw.duanshu.com/2ejd7567dedb9480b1/#/",
          type: "link",
          target: ""
        },
        {
          title: "肿瘤药物查询系统",
          src: "https://nordata.com.cn/journal/index.html#/journals",
          type: "link",
          target: ""
        }
      ]
    },
    {
      title: "临床助手服务",
      span: 4,
      contentList: [
        {
          title: "智汇医圈训练营",
          src: "https://iwmtw.duanshu.com/2ejd7567dedb9480b1/#/",
          type: "link",
          target: "_blank"
        },
        {
          title: "期刊/影响因子查询系统",
          src: "https://nordata.com.cn/journal/index.html#/journals",
          type: "link",
          target: "_blank"
        },
        {
          title: "临床科研服务",
          src:
            "https://genius-community-frontend.oss-cn-shanghai.aliyuncs.com/%E5%AE%A3%E4%BC%A0%E5%86%8C.pdf",
          type: "link",
          target: "_blank"
        }
      ]
    },
    {
      title: "合作单位/企业",
      span: 5,
      contentList: [
        {
          title: "苏州诺德拓生物科技有限公司",
          src: "http://nordata.com.cn/",
          type: "link",
          target: "_blank"
        },
        {
          title: "超存软件科技（苏州）有限公司",
          src: "http://supersan.cn/",
          type: "link",
          target: "_blank"
        },
        {
          title: "复旦大学附属肿瘤医院",
          src: "http://www.shca.org.cn/dazhong2",
          type: "link",
          target: "_blank"
        },
        {
          title: "复旦大学附属中山医院",
          src: "http://www.zs-hospital.sh.cn/",
          type: "link",
          target: "_blank"
        },
        {
          title: "上海交通大学医学院附属瑞金医院",
          src: "http://www.rjh.com.cn/",
          type: "link",
          target: "_blank"
        }
      ]
    },
    {
      title: "新闻报道",
      span: 7,
      contentList: [
        {
          title: "接连获批，医疗AI诊断决策支持的春天即将到来？",
          src: "https://36kr.com/p/5127512.html",
          type: "link",
          target: "_blank"
        },
        {
          title: "2018肿瘤趋势汇总，众多创新疗法展现，肿瘤药将迎来大爆发",
          src: "http://vcbeat.net/OGRkMDQwZTk3ZTMzNDJiMmNkMWM1MjU2ZDA0OTFiNmU=",
          type: "link",
          target: "_blank"
        },
        {
          title: "2017年全球肿瘤治疗趋势：肿瘤治疗越治越贵？",
          src:
            "http://tech.sina.com.cn/d/f/2017-06-30/doc-ifyhrxtp6354099.shtml",
          type: "link",
          target: "_blank"
        }
      ]
    }
  ],
  about: {
    title: "团队介绍",
    desc:
      "智汇医圈是苏州诺德拓生物科技有限公司开发运营的面向肿瘤医生的在线服务平台。致力于将人工智能技术与全球最权威的肿瘤诊治指南相结合，倾力打造最便捷准确的决策支持系统。并与全国顶尖的肿瘤专家合作，在线上平台为肿瘤医生带来最前沿权威的决策支持与相关学习材料。<br>时至今日，基于自主研发的智能决策支持系统，智汇医圈提供近23种肿瘤的线上决策支持，并结合当前最热门的基因检测、靶向药物、免疫治疗等等新技术，为肿瘤医生的训练与学习提供全方位、可靠的支持，在肿瘤医生口中积累了良好的口碑。同时，智汇医圈也借助智能决策支持系统为低年资肿瘤医生的临床决策训练提供支持，将全球最前沿的肿瘤诊治技术与经验在线呈现",
    aboutLogo: require("../assets/img/aboutme.png"),
    infoList: [
      {
        title: "用户服务",
        desc: "如果您在产品使用上有任何问题，都可以通过下列方式联系到我们",
        details:
          "<ul><li>客服电话：13162365980 (周一至周日 9:00--22:00)</li><li>客服微信：nordata</li><li>客服邮箱：service@nordata.com.cn</li></ul>"
      },
      {
        title: "关注我们",
        desc:
          "想要知道智汇医圈的最新动态，可以关注我们的微信公众号或者联系我们的客服",
        details:
          "<ul><li>智汇医圈微信公众号：medical_data_ai</li><li>客服微信：nordata</li></ul>"
      },
      {
        title: "公司地址",
        desc: "如果你刚好路过这里，不妨进来和我们聊聊天，我们请你喝咖啡：）",
        details:
          "<ul><li>上海市杨浦区四平路2158号1305室（地铁五角场3号口）</li><li>上海市复旦大学江湾校区生命科学院大楼</li></ul>",
        imageSrc: require("../assets/img/map.jpg")
      }
    ],
    timelineItemList: [
      {
        title: "2018年7月",
        desc: "智汇医圈训练营上线，为科研人员提供肿瘤资讯与数据分析学习平台"
      },
      {
        title: "2018年6月",
        desc: "智汇医圈肿瘤药物信息查询系统-微信版上线"
      },
      {
        title: "2018年4月",
        desc: "智汇医圈期刊与影响因子查询系统-微信版上线"
      },
      {
        title: "2018年3月",
        desc: "智汇医圈与智汇医圈Plus公众号开通，开始为科研人员提供肿瘤资讯服务"
      },
      {
        title: "2017年12月",
        desc:
          "公司与广西医科大学共同申报广西省科技课题“广西高发肿瘤精准医疗大数据平台和智能决策系统的构建"
      },
      {
        title: "2017年10月",
        desc:
          "公司与超存科技有限公司达成战略合作，共同研发Swarm®肿瘤大数据分析系统"
      },
      {
        title: "2017年1月",
        desc: "初创项目ClideSys临床决策支持系统雏形"
      },
      {
        title: "2016年12月",
        desc:
          "组建团队注册成立苏州诺德拓生物科技有限公司，提供肿瘤大数据分析解决方案，包括个性化定制分析服务与数据分析平台"
      }
    ]
  }
};

export default config;
