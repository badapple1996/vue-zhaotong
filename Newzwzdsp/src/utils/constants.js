// 申请业务类型 job	个人就业创业 retire	退休一件事 bankruptcy	企业破产一件事
export const APPLY_TYPE = {
  JOB: { label: '个人就业创业', value: 'job' },
  RETIRE: { label: '退休一件事', value: 'retire' },
  BANKRUPTCY: { label: '企业破产一件事', value: 'bankruptcy' }
}
// 办件状态
export const PROCESS_STATUS = {
  RECEIVE_SUCCESS: { label: '接收成功', value: '1' },
  RECEIVE_FAILURE: { label: '接收失败', value: '2' },
  FEEDBACK_SUCCESS: { label: '反馈成功', value: '3' },
  FEEDBACK_FAILURE: { label: '反馈失败', value: '4' },
  OUTCALL_SUCCESS: { label: '外呼成功', value: '5' },
  OUTCALL_FAILURE: { label: '外呼失败', value: '6' }
}
// 证件类型
export const DOCUMENT_TYPE = [
  {
    value: '01',
    label: '居民身份证（户口簿）'
  },
  {
    value: '02',
    label: '中国人民解放军军官证'
  },
  {
    value: '03',
    label: '中国人民武装警察警官证'
  },
  {
    value: '04',
    label: '香港特区护照/港澳居民来往内地通行证'
  },
  {
    value: '05',
    label: '澳门特区护照/港澳居民来往内地通行证'
  },
  {
    value: '06',
    label: '台湾居民来往大陆通行证'
  },
  {
    value: '07',
    label: '外国人永久居留证'
  },
  {
    value: '08',
    label: '外国人护照'
  },
  {
    value: '09',
    label: '残疾人证'
  },
  {
    value: '10',
    label: '军烈属证明'
  },
  {
    value: '11',
    label: '外国人就业证'
  },
  {
    value: '12',
    label: '外国专家证'
  },
  {
    value: '13',
    label: '外国人常驻记者证'
  },
  {
    value: '14',
    label: '台港澳人员就业证'
  },
  {
    value: '15',
    label: '回国（来华）定居专家证'
  },
  {
    value: '16',
    label: '港澳台居民居住证'
  },
  {
    value: '17',
    label: '中国护照'
  },
  {
    value: '90',
    label: '社会保障卡'
  },
  {
    value: '91',
    label: '保密人员证件'
  },
  {
    value: '99',
    label: '其他身份证件'
  }
]
// 性别
export const GENDER = [
  { label: '未知的性别', value: '0' },
  { label: '男性', value: '1' },
  { label: '女性', value: '2' },
  { label: '未说明性别', value: '9' }
]
// 民族
export const NATION = [
  { label: '汉族', value: '01' },
  { label: '蒙古族', value: '02' },
  { label: '回族', value: '03' },
  { label: '藏族', value: '04' },
  { label: '维吾尔族', value: '05' },
  { label: '苗族', value: '06' },
  { label: '彝族', value: '07' },
  { label: '壮族', value: '08' },
  { label: '布依族', value: '09' },
  { label: '朝鲜族', value: '10' },
  { label: '满族', value: '11' },
  { label: '侗族', value: '12' },
  { label: '瑶族', value: '13' },
  { label: '白族', value: '14' },
  { label: '土家族', value: '15' },
  { label: '哈尼族', value: '16' },
  { label: '哈萨克族', value: '17' },
  { label: '傣族', value: '18' },
  { label: '黎族', value: '19' },
  { label: '傈僳族', value: '20' },
  { label: '佤族', value: '21' },
  { label: '畲族', value: '22' },
  { label: '高山族', value: '23' },
  { label: '拉祜族', value: '24' },
  { label: '水族', value: '25' },
  { label: '东乡族', value: '26' },
  { label: '纳西族', value: '27' },
  { label: '景颇族', value: '28' },
  { label: '柯尔克孜族', value: '29' },
  { label: '土族', value: '30' },
  { label: '达斡尔族', value: '31' },
  { label: '仫佬族', value: '32' },
  { label: '羌族', value: '33' },
  { label: '布朗族', value: '34' },
  { label: '撒拉族', value: '35' },
  { label: '毛南族', value: '36' },
  { label: '仡佬族', value: '37' },
  { label: '锡伯族', value: '38' },
  { label: '阿昌族', value: '39' },
  { label: '普米族', value: '40' },
  { label: '塔吉克族', value: '41' },
  { label: '怒族', value: '42' },
  { label: '乌孜别克族', value: '43' },
  { label: '俄罗斯族', value: '44' },
  { label: '鄂温克族', value: '45' },
  { label: '德昂族', value: '46' },
  { label: '保安族', value: '47' },
  { label: '裕固族', value: '48' },
  { label: '京族', value: '49' },
  { label: '塔塔尔族', value: '50' },
  { label: '独龙族', value: '51' },
  { label: '鄂伦春族', value: '52' },
  { label: '赫哲族', value: '53' },
  { label: '门巴族', value: '54' },
  { label: '珞巴族', value: '55' },
  { label: '基诺族', value: '56' },
  { label: '其他', value: '99' }
]

// 婚姻状态
export const MARITAL_STATUS = [
  { label: '未婚', value: '1' },
  { label: '已婚', value: '2' },
  { label: '离异', value: '3' }
]
// 户口性质
export const NTR_F_HSHLD_RGSTRTN = [
  { label: '非农业户口（城镇）', value: '10' },
  { label: '本地非农业户口（本地城镇）', value: '11' },
  { label: '外地非农业户口（外地城镇）', value: '12' },
  { label: '农业户口（农村）', value: '20' },
  { label: '本地农业户口（本地农村）', value: '21' },
  { label: '外地农业户口（外地农村）', value: '22' },
  { label: '港澳台侨人员', value: '30' },
  { label: '香港特别行政区居民', value: '31' },
  { label: '澳门特别行政区居民', value: '32' },
  { label: '台湾地区居民', value: '33' },
  { label: '华侨', value: '34' },
  { label: '外国人', value: '40' }
]

// 缴存银行
export const DEPOSIT_INTO_BANK = [
  { label: '中国银行', value: '1' },
  { label: '农业银行', value: '2' },
  { label: '工商银行', value: '3' },
  { label: '建设银行', value: '4' },
  { label: '交通银行', value: '5' },
  { label: '其他银行', value: '6' }
]

// 学历
export const EDUCATION = [
  { label: '博士研究生', value: '11' },
  { label: '硕士研究生', value: '14' },
  { label: '大学本科', value: '21' },
  { label: '大学专科', value: '31' },
  { label: '中等专科', value: '41' },
  { label: '职业高中', value: '44' },
  { label: '技工学校', value: '47' },
  { label: '普通中学', value: '61' },
  { label: '初级中学', value: '71' },
  { label: '小学', value: '81' },
  { label: '其他', value: '90' }
]

// 缴款方式
export const PAYMENT_METHOD = [
  { label: '自主灵活缴存', value: '1' },
  { label: '按月等额托收', value: '2' }
]

// 人员类型
export const PERSONNEL_TYPE = [
  { label: '灵活就业人员', value: '1' },
  { label: '企业职工', value: '2' },
  { label: '机关事业单位人员', value: '3' }
]

// 人员类别
export const PERSONNEL_CATEGORY = [
  { label: '国家公务员', value: '11' },
  { label: '参照公务员管理人员', value: '12' },
  { label: '专业技术人员', value: '13' },
  { label: '事业单位管理人员', value: '14' },
  { label: '机关勤工人员', value: '15' },
  { label: '事业单位工人', value: '16' },
  { label: '职员', value: '17' },
  { label: '企业管理人员', value: '21' },
  { label: '工人', value: '24' },
  { label: '农民', value: '27' },
  { label: '学士', value: '31' },
  { label: '现役军人', value: '37' },
  { label: '自由职业者', value: '51' },
  { label: '个体经营者', value: '54' }
]
// 行政区代码
export const AREA_CODE = [
  {
    value: '530000000000',
    label: '云南省'
  },
  {
    value: '530100000000',
    label: '昆明市'
  },
  {
    value: '530102000000',
    label: '五华区'
  },
  {
    value: '530111000000',
    label: '官渡区'
  },
  {
    value: '530112000000',
    label: '西山区'
  },
  {
    value: '530114000000',
    label: '呈贡区'
  },
  {
    value: '530124000000',
    label: '富民县'
  },
  {
    value: '530125000000',
    label: '宜良县'
  },
  {
    value: '530127000000',
    label: '嵩明县'
  },
  {
    value: '530128000000',
    label: '禄劝彝族苗族自治县'
  },
  {
    value: '530129000000',
    label: '寻甸回族彝族自治县'
  },
  {
    value: '530181000000',
    label: '安宁市'
  },
  {
    value: '530304000000',
    label: '马龙区'
  },
  {
    value: '530322000000',
    label: '陆良县'
  },
  {
    value: '530324000000',
    label: '罗平县'
  },
  {
    value: '530326000000',
    label: '会泽县'
  },
  {
    value: '530303000000',
    label: '沾益区'
  },
  {
    value: '530381000000',
    label: '宣威市'
  },
  {
    value: '530400000000',
    label: '玉溪市'
  },
  {
    value: '530402000000',
    label: '红塔区'
  },
  {
    value: '530403000000',
    label: '江川区'
  },
  {
    value: '530481000000',
    label: '澄江市'
  },
  {
    value: '530423000000',
    label: '通海县'
  },
  {
    value: '530424000000',
    label: '华宁县'
  },
  {
    value: '530425000000',
    label: '易门县'
  },
  {
    value: '530427000000',
    label: '新平彝族傣族自治县'
  },
  {
    value: '530428000000',
    label: '元江哈尼族彝族傣族自治县'
  },
  {
    value: '530500000000',
    label: '保山市'
  },
  {
    value: '530501000000',
    label: '市辖区'
  },
  {
    value: '530502000000',
    label: '隆阳区'
  },
  {
    value: '530521000000',
    label: '施甸县'
  },
  {
    value: '530523000000',
    label: '龙陵县'
  },
  {
    value: '530524000000',
    label: '昌宁县'
  },
  {
    value: '530600000000',
    label: '昭通市'
  },
  {
    value: '530601000000',
    label: '市辖区'
  },
  {
    value: '530602000000',
    label: '昭阳区'
  },
  {
    value: '530621000000',
    label: '鲁甸县'
  },
  {
    value: '530623000000',
    label: '盐津县'
  },
  {
    value: '530624000000',
    label: '大关县'
  },
  {
    value: '530625000000',
    label: '永善县'
  },
  {
    value: '530626000000',
    label: '绥江县'
  },
  {
    value: '530627000000',
    label: '镇雄县'
  },
  {
    value: '530629000000',
    label: '威信县'
  },
  {
    value: '530681000000',
    label: '水富市'
  },
  {
    value: '530144000000',
    label: '昆明倘甸产业园区和轿子山旅游开发区'
  },
  {
    value: '530340000000',
    label: '曲靖市经济技术开发区'
  },
  {
    value: '530323000000',
    label: '师宗县'
  },
  {
    value: '530140000000',
    label: '昆明滇池国家旅游度假区'
  },
  {
    value: '530141000000',
    label: '昆明阳宗海风景名胜区'
  },
  {
    value: '530142000000',
    label: '昆明经济技术开发区'
  },
  {
    value: '530143000000',
    label: '昆明高新技术产业开发区'
  },
  {
    value: '530199000000',
    label: '昆明市本级'
  },
  {
    value: '539900000000',
    label: '云南省本级'
  },
  {
    value: '533499000000',
    label: '迪庆藏族自治州本级'
  },
  {
    value: '533399000000',
    label: '怒江傈僳族自治州本级'
  },
  {
    value: '533199000000',
    label: '德宏傣族景颇族自治州本级'
  },
  {
    value: '532999000000',
    label: '大理白族自治州本级'
  },
  {
    value: '532899000000',
    label: '西双版纳傣族自治州本级'
  },
  {
    value: '532699000000',
    label: '文山壮族苗族自治州本级'
  },
  {
    value: '532599000000',
    label: '红河哈尼族彝族自治州本级'
  },
  {
    value: '532399000000',
    label: '楚雄彝族自治州本级'
  },
  {
    value: '530999000000',
    label: '临沧市本级'
  },
  {
    value: '530899000000',
    label: '普洱市本级'
  },
  {
    value: '530799000000',
    label: '丽江市本级'
  },
  {
    value: '530699000000',
    label: '昭通市本级'
  },
  {
    value: '530599000000',
    label: '保山市本级'
  },
  {
    value: '530499000000',
    label: '玉溪市本级'
  },
  {
    value: '530399000000',
    label: '曲靖市本级'
  },
  {
    value: '530440000000',
    label: '玉溪市高新技术开发区'
  },
  {
    value: '530102001000',
    label: '华山街道'
  },
  {
    value: '530102002000',
    label: '护国街道'
  },
  {
    value: '530102003000',
    label: '大观街道'
  },
  {
    value: '530102004000',
    label: '龙翔街道'
  },
  {
    value: '530102005000',
    label: '丰宁街道'
  },
  {
    value: '530102006000',
    label: '莲华街道'
  },
  {
    value: '530102007000',
    label: '红云街道'
  },
  {
    value: '530102008000',
    label: '黑林铺街道'
  },
  {
    value: '530102009000',
    label: '普吉街道'
  },
  {
    value: '530102010000',
    label: '西翥街道'
  },
  {
    value: '530102401000',
    label: '昆明国家高新技术产业开发区'
  },
  {
    value: '530102001001',
    label: '翠湖西路社区'
  },
  {
    value: '530102001002',
    label: '水晶宫社区'
  },
  {
    value: '530102001003',
    label: '五华山社区'
  },
  {
    value: '530102001004',
    label: '文化巷社区'
  },
  {
    value: '530102001005',
    label: '翠湖北路社区'
  },
  {
    value: '530102001006',
    label: '北门社区'
  },
  {
    value: '530102001007',
    label: '翠湖社区'
  },
  {
    value: '530102001008',
    label: '圆通西路社区'
  },
  {
    value: '530102001009',
    label: '云南大学社区'
  },
  {
    value: '530102001010',
    label: '圆通社区'
  },
  {
    value: '530102001011',
    label: '云南师范大学社区'
  },
  {
    value: '530924000000',
    label: '镇康县'
  },
  {
    value: '532322000000',
    label: '双柏县'
  },
  {
    value: '530401000000',
    label: '市辖区'
  },
  {
    value: '530721000000',
    label: '玉龙纳西族自治县'
  },
  {
    value: '532502000000',
    label: '开远市'
  },
  {
    value: '532927000000',
    label: '巍山彝族回族自治县'
  },
  {
    value: '530302000000',
    label: '麒麟区'
  },
  {
    value: '532329000000',
    label: '武定县'
  },
  {
    value: '532523000000',
    label: '屏边苗族自治县'
  },
  {
    value: '532530000000',
    label: '金平苗族瑶族傣族自治县'
  },
  {
    value: '532624000000',
    label: '麻栗坡县'
  },
  {
    value: '532801000000',
    label: '景洪市'
  },
  {
    value: '532923000000',
    label: '祥云县'
  },
  {
    value: '532929000000',
    label: '云龙县'
  },
  {
    value: '533100000000',
    label: '德宏傣族景颇族自治州'
  },
  {
    value: '533301000000',
    label: '泸水市'
  },
  {
    value: '533422000000',
    label: '德钦县'
  },
  {
    value: '530103000000',
    label: '盘龙区'
  },
  {
    value: '530700000000',
    label: '丽江市'
  },
  {
    value: '530701000000',
    label: '市辖区'
  },
  {
    value: '530702000000',
    label: '古城区'
  },
  {
    value: '530722000000',
    label: '永胜县'
  },
  {
    value: '530723000000',
    label: '华坪县'
  },
  {
    value: '530724000000',
    label: '宁蒗彝族自治县'
  },
  {
    value: '530800000000',
    label: '普洱市'
  },
  {
    value: '530801000000',
    label: '市辖区'
  },
  {
    value: '530802000000',
    label: '思茅区'
  },
  {
    value: '530821000000',
    label: '宁洱哈尼族彝族自治县'
  },
  {
    value: '530823000000',
    label: '景东彝族自治县'
  },
  {
    value: '530824000000',
    label: '景谷傣族彝族自治县'
  },
  {
    value: '530825000000',
    label: '镇沅彝族哈尼族拉祜族自治县'
  },
  {
    value: '530826000000',
    label: '江城哈尼族彝族自治县'
  },
  {
    value: '530827000000',
    label: '孟连傣族拉祜族佤族自治县'
  },
  {
    value: '530828000000',
    label: '澜沧拉祜族自治县'
  },
  {
    value: '530829000000',
    label: '西盟佤族自治县'
  },
  {
    value: '530902000000',
    label: '临翔区'
  },
  {
    value: '530921000000',
    label: '凤庆县'
  },
  {
    value: '530922000000',
    label: '云县'
  },
  {
    value: '530923000000',
    label: '永德县'
  },
  {
    value: '530926000000',
    label: '耿马傣族佤族自治县'
  },
  {
    value: '530927000000',
    label: '沧源佤族自治县'
  },
  {
    value: '532300000000',
    label: '楚雄彝族自治州'
  },
  {
    value: '532301000000',
    label: '楚雄市'
  },
  {
    value: '532323000000',
    label: '牟定县'
  },
  {
    value: '532324000000',
    label: '南华县'
  },
  {
    value: '530115000000',
    label: '晋宁区'
  },
  {
    value: '530300000000',
    label: '曲靖市'
  },
  {
    value: '530426000000',
    label: '峨山彝族自治县'
  },
  {
    value: '530581000000',
    label: '腾冲市'
  },
  {
    value: '530622000000',
    label: '巧家县'
  },
  {
    value: '530628000000',
    label: '彝良县'
  },
  {
    value: '530822000000',
    label: '墨江哈尼族自治县'
  },
  {
    value: '530900000000',
    label: '临沧市'
  },
  {
    value: '530925000000',
    label: '双江拉祜族佤族布朗族傣族自治县'
  },
  {
    value: '532327000000',
    label: '永仁县'
  },
  {
    value: '532528000000',
    label: '元阳县'
  },
  {
    value: '532601000000',
    label: '文山市'
  },
  {
    value: '532627000000',
    label: '广南县'
  },
  {
    value: '532901000000',
    label: '大理市'
  },
  {
    value: '533103000000',
    label: '芒市'
  },
  {
    value: '533323000000',
    label: '福贡县'
  },
  {
    value: '532890000000',
    label: '磨憨镇'
  },
  {
    value: '530113000000',
    label: '东川区'
  },
  {
    value: '530126000000',
    label: '石林彝族自治县'
  },
  {
    value: '530325000000',
    label: '富源县'
  },
  {
    value: '532325000000',
    label: '姚安县'
  },
  {
    value: '532326000000',
    label: '大姚县'
  },
  {
    value: '532328000000',
    label: '元谋县'
  },
  {
    value: '532331000000',
    label: '禄丰县'
  },
  {
    value: '532500000000',
    label: '红河哈尼族彝族自治州'
  },
  {
    value: '532501000000',
    label: '个旧市'
  },
  {
    value: '532503000000',
    label: '蒙自市'
  },
  {
    value: '532524000000',
    label: '建水县'
  },
  {
    value: '532525000000',
    label: '石屏县'
  },
  {
    value: '532504000000',
    label: '弥勒市'
  },
  {
    value: '532527000000',
    label: '泸西县'
  },
  {
    value: '532529000000',
    label: '红河县'
  },
  {
    value: '532531000000',
    label: '绿春县'
  },
  {
    value: '532532000000',
    label: '河口瑶族自治县'
  },
  {
    value: '532600000000',
    label: '文山壮族苗族自治州'
  },
  {
    value: '530901000000',
    label: '市辖区'
  },
  {
    value: '532622000000',
    label: '砚山县'
  },
  {
    value: '530145000000',
    label: '磨憨镇'
  },
  {
    value: '532623000000',
    label: '西畴县'
  },
  {
    value: '532625000000',
    label: '马关县'
  },
  {
    value: '532626000000',
    label: '丘北县'
  },
  {
    value: '532628000000',
    label: '富宁县'
  },
  {
    value: '532800000000',
    label: '西双版纳傣族自治州'
  },
  {
    value: '532822000000',
    label: '勐海县'
  },
  {
    value: '532823000000',
    label: '勐腊县'
  },
  {
    value: '532900000000',
    label: '大理白族自治州'
  },
  {
    value: '532922000000',
    label: '漾濞彝族自治县'
  },
  {
    value: '532924000000',
    label: '宾川县'
  },
  {
    value: '532925000000',
    label: '弥渡县'
  },
  {
    value: '532926000000',
    label: '南涧彝族自治县'
  },
  {
    value: '532928000000',
    label: '永平县'
  },
  {
    value: '532930000000',
    label: '洱源县'
  },
  {
    value: '532931000000',
    label: '剑川县'
  },
  {
    value: '532932000000',
    label: '鹤庆县'
  },
  {
    value: '533102000000',
    label: '瑞丽市'
  },
  {
    value: '533122000000',
    label: '梁河县'
  },
  {
    value: '533123000000',
    label: '盈江县'
  },
  {
    value: '533124000000',
    label: '陇川县'
  },
  {
    value: '533300000000',
    label: '怒江傈僳族自治州'
  },
  {
    value: '533324000000',
    label: '贡山独龙族怒族自治县'
  },
  {
    value: '533325000000',
    label: '兰坪白族普米族自治县'
  },
  {
    value: '533400000000',
    label: '迪庆藏族自治州'
  },
  {
    value: '533421000000',
    label: '香格里拉县'
  },
  {
    value: '533423000000',
    label: '维西傈僳族自治县'
  }
]
