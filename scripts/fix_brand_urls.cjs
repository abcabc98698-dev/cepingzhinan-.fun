const fs = require('fs');
const path = require('path');

const brandsDir = path.resolve('src/content/brands');

const urlFixes = {
  "edgenova.json": {
    affUrl: "https://work.edgenovaaff.cc/#/register?code=cl3iB5YG",
    officialUrl: "https://work.edgenovaaff.cc/"
  },
  "fatcat.json": {
    affUrl: "https://guangs.flycataff.com/#/?code=6uq0Xe9y",
    officialUrl: "https://guangs.flycataff.com/"
  },
  "flyingbird.json": {
    affUrl: "https://flyingbird.run/",
    officialUrl: "https://flyingbird.run/"
  },
  "fscloud.json": {
    affUrl: "https://fscloud.cc/",
    officialUrl: "https://fscloud.cc/"
  },
  "ikuuu.json": {
    affUrl: "https://ikuuu.pw/",
    officialUrl: "https://ikuuu.pw/"
  },
  "immtelecom.json": {
    affUrl: "https://www.immtelecom.com/",
    officialUrl: "https://www.immtelecom.com/"
  },
  "langwang.json": {
    affUrl: "https://varnexa.wavenetaff.com/#/?code=xwAM4tTd",
    officialUrl: "https://varnexa.wavenetaff.com/"
  },
  "lingdongyun.json": {
    affUrl: "https://varnexa.lingdongaff.com/#/?code=wZvEhEoI",
    officialUrl: "https://varnexa.lingdongaff.com/"
  },
  "nexitally.json": {
    affUrl: "https://nexitally.com/",
    officialUrl: "https://nexitally.com/"
  },
  "qingyunti.json": {
    affUrl: "https://qingyunti.top/",
    officialUrl: "https://qingyunti.top/"
  },
  "sslar.json": {
    affUrl: "https://sslar.com/",
    officialUrl: "https://sslar.com/"
  },
  "suying666.json": {
    affUrl: "https://suying666.info/",
    officialUrl: "https://suying666.info/"
  },
  "tag-vpn.json": {
    affUrl: "https://tagstation.one/",
    officialUrl: "https://tagstation.one/"
  },
  "tntcloud.json": {
    affUrl: "https://tntcloud.net/",
    officialUrl: "https://tntcloud.net/"
  },
  "totoro.json": {
    affUrl: "https://totorocloud.com/",
    officialUrl: "https://totorocloud.com/"
  },
  "yinghuochong.json": {
    affUrl: "https://vip02.fireflyaff.com/#/?code=jTp9wSgZ",
    officialUrl: "https://vip02.fireflyaff.com/"
  }
};

for (const [file, fixes] of Object.entries(urlFixes)) {
  const filePath = path.join(brandsDir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.affUrl = fixes.affUrl;
    data.officialUrl = fixes.officialUrl;
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${file}: ${fixes.officialUrl}`);
  } else {
    console.warn(`File not found: ${filePath}`);
  }
}
