//citation: https://www.npmjs.com/package/react-native-table-component
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity ,  ScrollView, Alert } from 'react-native';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import {Actions} from 'react-native-router-flux';


export default class Image extends Component {


    constructor(props){
        super(props)
        this.state = {
            tableHead: ['Title', 'Name', 'Email', 'Share'],
            tableData: [
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],
                ['Prof.', 'Kimberly Kurt', 'Kimberly.k@prmedical.com', 'Kimberly Kurt'],
                ['Dr.', 'Graham Griffiths', 'Kimberly.k@prmedical.com', 'Graham Griffiths'],

            ]
        }
    }
    goBack() {
        Actions.pop()
    }

    _alertIndex(data) {
        Alert.alert(`You are contacting ${data}`);
    }

    render() {
        const state = this.state;
        const element = (data, index) => (
            <TouchableOpacity onPress={() => this._alertIndex(data)}>
                <View style={styles.btn}>
                    <Text style={styles.btnText}>contact</Text>
                </View>
            </TouchableOpacity>
        );


        return(
            <View style={styles.container}>
                <Table >
                    <ScrollView  style={styles.scrollView}>
                        <Row data={state.tableHead} style={styles.head} textStyle={styles.headText}/>


                        {

                            state.tableData.map((rowData, index) => (
                                <TableWrapper key={index} style={styles.row}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={cellIndex === 3 ? element(cellData, index) : cellData} textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))

                        }
                    </ScrollView>
                </Table>
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: { flex: 1, //padding: 16, //paddingTop: 30,
        backgroundColor: 'white'
    },
    head: { height: 40, backgroundColor: '#2C66BA' },
    text: { margin: 6 },
    headText: { margin: 6 ,  color: '#ffffff'},
    row: { flexDirection: 'row', backgroundColor: 'white' },
    btn: { width: 58, height: 18, backgroundColor: '#595bbb',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' },
    scrollView: {
        marginHorizontal: 0,
    },
});
