import { StyleSheet } from "react-native";

const commonStyles = {
    // Common styles
    background: {
      backgroundColor: '#f5f5f9',
    },
    container: {
      height: 5,
    },
    title: {
      fontSize: 24,
    },
    input: {
      height: 40,
      width: '80%',
      margin: 12,
      borderRadius: 10,
      backgroundColor: '#D9D9D9',
      padding: 10,
    },
    touchableOpacityStyle: {
      position: 'absolute',
      width: 60,
      height: 60,
      alignItems: 'center',
      justifyContent: 'center',
      right: 30,
      bottom: 30,
    },
    floatingButtonStyle: {
      borderRadius: 50,
      width: 50,
      height: 50,
      backgroundColor: '#fff',
    },
  };
  
  const boardStyles = {
    // Board styles
    boardId: {
      marginTop: 10,
      marginLeft: 10,
    },
    titleContainer: {
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 25,
    },
    metadataContainer: {
      margin: 5,
      flexDirection: 'row',
    },
    authorImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      margin: 5,
    },
    authorName: {
      margin: 15,
      fontSize: 15,
    },
    updated: {
      textAlign: 'right',
      marginBottom: 10,
      marginRight: 10,
    },
    horizontalLine: {
      borderBottomColor: '#D9D9D9',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    contentContainer: {
      minHeight: 200,
      padding: 10,
    },
    replyContainer: {
      margin: 5,
      flexDirection: 'row',
    },
    replyImage: {
      width: 50,
      height: 50,
      borderRadius: 50,
      margin: 5,
    },
    replyContentContainer: {
      marginLeft: 10,
    },
    replyHeaderContainer: {
      justifyContent: 'space-around',
    },
    replyAuthor: {
      fontSize: 15,
    },
    replyTime: {
      textAlign: 'right',
    },
    replyContents: {},
    replyDivider: {
      borderBottomColor: '#D9D9D9',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        paddingBottom: 10,
        paddingTop: 10,
      },
      itemContent: {},
      itemReply: {},
    
  };
  
  export { commonStyles, boardStyles };
  