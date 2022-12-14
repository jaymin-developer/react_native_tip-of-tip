import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const main =
  "https://storage.googleapis.com/sparta-image.appspot.com/lecture/main.png";
import Card from "../components/Card";
import Loading from "../components/Loading";
import { firebase_db } from "../firebaseConfig";

export default function MainPage({ navigation, route }) {
  //useState 사용법
  //[state,setState] 에서 state는 이 컴포넌트에서 관리될 상태 데이터를 담고 있는 변수
  //setState는 state를 변경시킬때 사용해야하는 함수

  //모두 다 useState가 선물해줌
  //useState()안에 전달되는 값은 state 초기값
  const [state, setState] = useState([]);
  const [cateState, setCateState] = useState([]);

  //하단의 return 문이 실행되어 화면이 그려진다음 실행되는 useEffect 함수
  //내부에서 data.json으로 부터 가져온 데이터를 state 상태에 담고 있음
  const [ready, setReady] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      title: "개발자 면접 모음집",
    });

    setTimeout(() => {
      firebase_db
        .ref("/tip")
        .once("value")
        .then((snapshot) => {
          let tip = snapshot.val();

          setState(tip);
          setCateState(tip);
          setReady(false);
        });
    }, 1000);
  }, []);

  const category = (cate) => {
    if (cate == "전체보기") {
      //전체보기면 원래 꿀팁 데이터를 담고 있는 상태값으로 다시 초기화
      setCateState(state);
    } else {
      setCateState(
        state.filter((el) => {
          return el.category == cate;
        })
      );
    }
  };

  return ready ? (
    <Loading />
  ) : (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => {
          navigation.navigate("AboutPage");
        }}
      >
        <Text style={styles.aboutButtonText}>소개 페이지</Text>
      </TouchableOpacity>
      <Image style={styles.mainImage} source={{ uri: main }} />
      <ScrollView
        style={styles.middleContainer}
        horizontal
        indicatorStyle={"white"}
      >
        <TouchableOpacity
          style={styles.middleButtonAll}
          onPress={() => {
            category("전체보기");
          }}
        >
          <Text style={styles.middleButtonTextAll}>전체보기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton01}
          onPress={() => {
            category("생활");
          }}
        >
          <Text style={styles.middleButtonText}>생활</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton02}
          onPress={() => {
            category("재테크");
          }}
        >
          <Text style={styles.middleButtonText}>재테크</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton03}
          onPress={() => {
            category("반려견");
          }}
        >
          <Text style={styles.middleButtonText}>반려견</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.middleButton04}
          onPress={() => {
            navigation.navigate("LikePage");
          }}
        >
          <Text style={styles.middleButtonText}>꿀팁 찜</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.cardContainer}>
        {/* 하나의 카드 영역을 나타내는 View */}
        {cateState.map((content, i) => {
          return <Card content={content} key={i} navigation={navigation} />;
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    //앱의 배경 색
    backgroundColor: "#fff",
  },
  mainImage: {
    //컨텐츠의 넓이 값
    width: "90%",
    //컨텐츠의 높이 값
    height: 200,
    //컨텐츠의 모서리 구부리기
    borderRadius: 10,
    marginTop: 20,
    //컨텐츠 자체가 앱에서 어떤 곳에 위치시킬지 결정(정렬기능)
    //각 속성의 값들은 공식문서에 고대로~ 나와 있음
    alignSelf: "center",
  },
  middleContainer: {
    marginTop: 20,
    marginLeft: 10,
    height: 60,
  },
  middleButtonAll: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#20b2aa",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton01: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fdc453",
    borderColor: "deeppink",
    borderRadius: 15,
    margin: 7,
  },
  middleButton02: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#fe8d6f",
    borderRadius: 15,
    margin: 7,
  },
  middleButton03: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#9adbc5",
    borderRadius: 15,
    margin: 7,
  },
  middleButton04: {
    width: 100,
    height: 50,
    padding: 15,
    backgroundColor: "#f886a8",
    borderRadius: 15,
    margin: 7,
  },
  middleButtonText: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  middleButtonTextAll: {
    color: "#fff",
    fontWeight: "700",
    //텍스트의 현재 위치에서의 정렬
    textAlign: "center",
  },
  cardContainer: {
    marginTop: 10,
    marginLeft: 10,
  },
  aboutButton: {
    backgroundColor: "pink",
    width: 100,
    height: 40,
    borderRadius: 10,
    alignSelf: "flex-end",
    marginRight: 20,
    marginTop: 10,
  },
  aboutButtonText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
  },
});
