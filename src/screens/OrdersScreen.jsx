import BackgroundGradient from '../components/BackgroundGradient/BackgroundGradient'
import Spinner from '../components/Spinner/Spinner'
import { Text, View, FlatList, StyleSheet, Modal, Pressable } from 'react-native'
import OrderItem from '../components/OrderItem/OrderItem'
import { useGetOrdersQuery } from '../services/shopService'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { colors } from '../global/colors'




const OrdersScreen = () => {
  const localId = useSelector((state) => state.authReducer.localId);
  const { data, isLoading, error } = useGetOrdersQuery(localId);
  const [orderData, setOrderData] = useState([]);
  const [orderIdSelected, setOrderIdSelected] = useState('');
  const [orderSelected, setOrderSelected] = useState({})
  const [modalVisible, setModalVisible] = useState(false);

  // Convierte el {{}} en [{}] para poder recorrerlos y mostrarlos en el flatlist
  // Si no se hace esto, no se puede mostrar el modal con la información de la orden seleccionada
  useEffect(() => {
    if (data) {
      const orderData = Object.values(data)
      setOrderData(orderData)
    }
  }, [data, isLoading])

  // Para mostrar el modal con la información de la orden seleccionada
  useEffect(() => {
    const orderSelected = orderData.find((order) => order.orderId === orderIdSelected)
    setOrderSelected(orderSelected)
  }, [orderIdSelected, orderData])

  const renderOrderItem = ({ item }) => {
    return (
      <OrderItem
        order={item}
        setOrderId={setOrderIdSelected}
        setModalVisible={setModalVisible}
      />
    )
  }

  return (
    <BackgroundGradient>

      {
        orderData.length === 0 ? (
          <View style={styles.noOrdersContainer}>
            <Text style={styles.noOrdersText}>There are not orders!</Text>
          </View>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <FlatList
            data={orderData}
            renderItem={renderOrderItem}
          />
        )
      }

      {orderSelected && (
        <Modal visible={modalVisible} transparent={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.modalTitle}>Order Id: {orderSelected.orderId}</Text>
                <Text style={styles.modalText}>• Price: U$D {orderSelected.total}</Text>
                <Text style={styles.modalText}>• Date: {orderSelected.createdAt}</Text>
                {orderSelected.cartItems?.map((item, index) => (
                  <View key={index}>
                    <Text style={styles.modalText}>• Name: {item.title}</Text>
                    <Text style={styles.modalText}>• Description: {item.description}</Text>
                    <Text style={styles.modalText}>• Quantity: {item.quantity}</Text>
                  </View>
                ))}
              </View>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.textStyle}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}

    </BackgroundGradient>

  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.lightBlue,
    marginTop: 20,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitle: {
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalText: {
    textAlign: 'left',
  },
  noOrdersContainer: {
    flex: 1,
  },
  noOrdersText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.textLight,
    marginVertical: 50,
  }
});