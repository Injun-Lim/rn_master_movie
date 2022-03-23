# ooh-ahag-e-UI

리액네 환경설정

---

git clone한 뒤 npm install 해줘야함

> Task :app:validateSigningDebug FAILED 에러가 뜬다면
> https://raw.githubusercontent.com/facebook/react-native/master/template/android/app/debug.keystore

---

#require

전체 가이드
https://reactnative.dev/docs/environment-setup

openjdk(8 or later), nodejs

chocolatey
https://chocolatey.org/

안드로이드스튜디오
-> https://developer.android.com/studio

설치후 settings -> Android SDK -> Android 11.0 체크, 우측하단 show package details -> Android SDK Platform 30 / Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image 체크
-> SDK Tools 탭 클릭 -> show package Details -> 30.0.2 클릭

-> 전체가이드에 나온대로 sdk 환경변수 설정(ANDROID_HOME) -> JAVA_HOME도 설정 (cmd javac 해보면 설정된지 나옴)

expo install expo-app-loading
expo install expo-asset
expo install expo-font
npm install @react-navigation/native
npm install @react-navigation/bottom-tabs
npm install @react-navigation/native-stack

expo install expo-dev-client
npx uri-scheme add oohah

---

git 관리 기초
https://victorydntmd.tistory.com/91

expo에서 No scheme specified for development client 에러 발생할 때

npm add uri-scheme
npx uri-scheme add [원하는 scheme]

expo로 테스트 원할시
expo start로 구동

expo 테스트시 폰에서 theme 적용이 잘 안된다면, (dark , light모드)
app.json에 "expo" 밑에 ,"userInterfaceStyle": "automatic" 추가

---

movie api key
4bcbfabbc30b44ceca30afb09d315286

npm install react-native-web-swiper
expo install expo-blur

---

width: "100%", height: "100%", position: "absolute"
-> StyleSheet.absoluteFill

날짜 컨트롤 강의 - RN 마스터클래스 - 3.7 Coming Soon - 13:40~

RN 안드로이드환경은 .toLocaleString() 이 원래 안먹는거같네요.

프로젝트 폴더 안의 android/app/build.gradle 에서
def jscFlavor = 'org.webkit:android-jsc:+'
선언부를
def jscFlavor = 'org.webkit:android-jsc-intl:+'
로 고치시고 앱과 서버를 다시켜면 적용됩니다.
참고: https://stackoverflow.com/questions/41408025/react-native-tolocalestring-not-working-on-android
