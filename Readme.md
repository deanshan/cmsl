# 这是一个常用方法的集合

### 数据类型

#### GetDataType(*target*)：获取数据类型
+ 返回值{string}    Null、Undefined、String、Array、Object、FormData...
+ target{any}(必填)

#### MatchDataType(*target,type*)：精准匹配数据类型
+ 返回值{boolean} true/false
+ target{any}(必填)
+ type{string}(必填)    可选值 Null、Undefined、String、Array、Object、FormData...

#### FilterDataType(*params*)：过滤指定数据类型，如[]、{}、""（包括去空格）、null、undefined

+ 返回值{boolean} true/false
+ params{any}

#### FilterObject(*object*)：过滤对象中的[]、{}、""（包括去空格）、null、undefined

+ 返回值{object}
+ object{object}(必填) 必须是object对象

#### GetTargetVal(*{target[, key, value]}*)：返回目标对象或目标对象的key值

+ 返回值{string}
+ target{any}(必填)
+ key{string}(选填) target的key,当target为对象时填写
+ value{string}(选填)   默认值 ""，经过filterParams过滤后，如果目标对象（或key）不存在或不符合要求，返回的值为value

#### GetTargetConst(*constant, value, key*)：返回常量集合中的key值

+ 返回值{string}    返回constant中的key值
+ constant{array}(必填) 目标常量集合，成员对象中必须含有value，格式：[{value:"",label:""},...]
+ value{string}(必填)  匹配constant中的value值
+ key{string}(必填) 匹配constant中的key值

#### NumberFormat(*type, number, other*)：计算2位（包括2位）以内的小数，主要用于金额的准确率（避免出现0.+0.2,0.8*3误差)

+ 返回值{number}
+ type{string}(必填)  可选值 '+'、'-'、'*'、'/'
+ number{string,number}(必填)
+ other{string,number}(必填)  当type为'/'是，不建议值为0，如果为0，默认返回0

### 日期时间

#### DateTimeFormat(*{ts[,type,flag,isTime]}*)  日期格式化
+ 默认值    yy-mm-dd hh:mm:ss
+ ts{number} 时间戳（必传）
+ flag{string}（选填）  日期的拼接格式  默认值 '-'
+ isTime{boolean}（选填）    返回值是否包括时间  默认值 true
+ type{string}（选填）  返回的日期格式（yy-mm-dd)  可选值 'YMD'、'YM'、'MD'
