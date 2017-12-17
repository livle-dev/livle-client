# LivleClient

#### Using Packages

* npm
* react-native & react
* prop-types
* axios
* react-navigation
* redux & react-redux
* react-native-snap-carousel
* react-native-localization
* react-native-keyboard-aware-scroll-view
* react-native-youtube
* faker

#### After Clone Project

> global (if you didn't setting react-native before)

```
~ $ brew install node
~ $ brew install watchman
~ $ npm i -g react-native-cli rnpm
```

> local

```
~ $ cd livle-client
~ $ npm i
~ $ react-native link
~ $ rnpm link
```

> run project

```
# iOS (Only works on Mac OS)
~ $ react-native run-ios
# ANDROID (After start Emulator or connect developer mode android phone)
~ $ react-native run-android
```

#### Custom Directories

```
|-- src
    |-- assets
        |-- animations
            |-- ...animation JS files
        |-- fonts
            |-- Font.js
        |-- images
            |-- ...image files(png)
            |-- Icon.js (외부에서 import하기 쉽도록 파일관리, TouchableOpacity 적용)
            |-- Background.js
        |-- strings
            |-- ...string files
        |-- stylesheets
            |-- global
                |-- Color.js (전역적으로 쓰이는 색 종류)
                |-- Scale.js (전역적으로 쓰이는 치수, 계산모듈)
                |-- Style.js (전역적으로 쓰이는 스타일)
            |-- local
                |-- ...local style JS files
    |-- components
        |-- navigations (react-navigation 관리파일)
            |-- home
                |-- GoConnector.js
                |-- HomeNavigation.js
                |-- MainConnector.js (Main Page에서 사용되는 달력 - 카드 navigation 기능을 위함)
                |-- SettingNavigation.js
            |-- login
                |-- LoginNavigation.js
            |-- AppNavigation.js
        |-- views
            |-- home
                |-- ...home view JS files
            |-- login
                |-- ...login view JS files
            |-- partials
                |-- ...partial view JS files
    |-- network
        |-- ...network JS files
        |-- index.js
    |-- reducers
        |-- ...reducer files
        |-- index.js
    |-- test
        |-- TestData.js (faker를 이용한 테스트데이터 생성)
|-- App.js (store 선언)
|-- index.js (default)
```

#### TIP

* Partial 파일명 규칙

```
언더바(\_)가 있으면 반복적으로 사용, 없으면 한번만 호출하여 사용
```

* Modal, MessageBar Component

```
global하면서 {position: 'absolute'} 이어야 하는 component인
Modal과 MessageBar는 App.js 파일에 선언되어
Redux를 이용해 해당 컴포넌트를 조작한다.
```

* React Native 는 Image 크기를 자동으로 처리해주는 기능이 없다 ..

```
-> width / height ratio를 게산해서 정적으로 넣어줘야 함
-> Scale.js에 이를 계산해주는 모듈이 있음
```

* ImageBackground 에는 style, imageStyle 2 가지 prop 이 있다 ..

```
-> 이유 : code를 보면 <View><Image />{children}<\/View> 형태로 만들어져있기 때문
-> resizeMode등 Image 컴포넌트에서 쓰이는 속성은 imageStyle에서 선언해야 한다.
-> width, height는 별도로 선언해줄 필요가 없다.
```
