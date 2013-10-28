#简单的协议介绍
从客户端到webapi部分的数据格式定义。

*****

##养殖运输环节

### 用户RFID认证部分

用户进行RFID信息认证时，终端只需输入RFID编号即可，终端采用http post方式传输数据，并将post的数据按照标准的网页post方式传输，方便进行网页开发和测试工作，以统一各个终端。

格式（终端）：{worker_rfid='rfid'}

**注意：‘rfid’表示具体的rfid信息，如‘20131234521423’**

### 生成运输批次RFID部分

当操作员依次将检验员和承运人信息输入且确认无误后，即可满足生成RFID批次条件，具体的格式如下

格式（终端）：{check_rfid='rfid'&trans_rfid='rfid'}

**注意：check_rfid表示检验员的rfid标识，trans_rfid表示承运人的rfid标识。**

### 添加生猪运输信息部分

发生在完成运输批次RFID添加之后，且必须有合法的批次RFID编号和工作人员编号

格式（终端）：{rfid='rfid'&pig_rfid='rfid'&weight='weight'}

**注意：rfid表示运输批次的rfid信息，pig_rfid表示生猪rfid标识，weight表示生猪重量。**

#### 生猪运输批次添加完成

当所有生猪添加完成后，为防止以后存在恶意添加情况发生，进行运输批次确认添加过程，防止再次进行添加操作。

格式（终端）：{check_rfid='rfid'&trans_id='rfid'&rfid='rfid'}

**注意：基本信息内容同上**

*****

## 屠宰场生猪接收环节

### 工作人员身份认证同上

### 创建屠宰批次

屠宰场检验员与承运人依次扫描自己的RFID卡，同时承运人扫描自己的运输批次RFID卡片，进行生成屠宰批次RFID信息。

格式（终端）：{check_rfid='rfid'&trans_id='rfid'&rfid='rfid'}

**注意：基本内容同上**

### 扫描生猪信息

依次扫描生猪的RFID耳标，将生猪RFID信息加入到屠宰批次中。

格式（终端）：{check_rfid='rfid'&trans_id='rfid'&rfid='rfid'&pig_rfid='rfid'}

**注意：基本内容同上**

****

## 屠宰场肉制品分类并贴条码

### 工作人员身份认证同上

### 输入屠宰批次RFID信息

屠宰场屠宰员输入自己的RFID信息，并以一定的方式输入屠宰批次RFID信息，进行屠宰批次确认

格式（终端）：{batch_rfid='rfid'}

**注意：batch_rfid表示屠宰批次的RFID信息，这里主要进行RFID信息认证**

### 添加肉制品类型

屠宰员将生鲜肉放在称重机上进行称重，并通过终端输入生鲜肉类型，从而添加生鲜肉类型信息。

格式（终端）：{check_rfid='rfid'&batch_rfid='rfid'&weight='weight'&type='type'}

**注意：weight表示生鲜肉重量，type表示生鲜肉类型**

*****

## 屠宰场生鲜肉出口

### 工作人员身份认证同上

### 添加生鲜肉运输信息

一次扫描检验员和承运人的RFID信息后，依次扫描肉制品的条形码即可。

格式（终端）：{check_rfid='rfid'&trans_id='rfid'&barcode='barcode'}

**注意：barcode表示生鲜肉上贴敷的条码信息**

*****

## 超市卖场生鲜肉接收和销售

### 工作人员身份认证同上

### 生鲜肉接收

扫描生鲜肉上的条码信息即可完成生鲜肉接收工作。

格式（终端）：{check_rfid='rfid'&barcode='barcode'}

**注意：字段解释同上**

#### 生鲜肉销售

工作人员切割相应重量的生鲜肉后进行称重，并扫描条形码，确认后传输即可。

格式（终端）：{check_rfid='rfid'&barcode='barcode'&weight='weight'}

**注意：weight表示生鲜肉称重信息**