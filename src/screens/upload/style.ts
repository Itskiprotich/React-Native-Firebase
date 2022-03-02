import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#bbded6',
    },
    vertical: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'space-between'
    },
    selectButton: {
        borderRadius: 5,
        marginTop: 20,
        width: 150,
        height: 50,
        backgroundColor: '#8ac6d1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center',
    },
    progressBarContainer: {
        marginTop: 20,
    },
    imageBox: {
        width: 300,
        height: 300,
    },
});