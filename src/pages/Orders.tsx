import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Order } from '../models/order';
import axios from 'axios';
import { Accordion, AccordionDetails, AccordionSummary, Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Divider } from '@mui/material';

const Orders = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const { data } = await axios.get<Order[]>('orders');
                setOrders(data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <Layout>
            {orders.map(order => (
                <Accordion key={order.id} sx={{ mb: 2 }}>
                    <AccordionSummary>
                        <Typography variant="h6" color="text.primary">
                            {order.name} - ${order.total.toFixed(2)}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ width: '100%' }}>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Product Title</TableCell>
                                        <TableCell align="right">Price</TableCell>
                                        <TableCell align="right">Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.order_items.map(item => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.product_title}</TableCell>
                                            <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                            <TableCell align="right">{item.quantity}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Layout>
    );
}

export default Orders;
