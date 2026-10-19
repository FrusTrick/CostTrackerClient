import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SubscriptionList() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [totalCost, setTotalCost] = useState(0);

    async function fetchSubscriptions() {
        try {
            const response = await axios.get(
                'https://localhost:7058/api/Subscription'
            );

            setSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    }

    // Fetch subscriptions when the component loads
    useEffect(() => {
        fetchSubscriptions();
    }, []);

    // Calculate total whenever subscriptions changes
    useEffect(() => {
        const total = subscriptions.reduce(
            (total, subscription) => total + subscription.cost,
            0
        );

        setTotalCost(total);
    }, [subscriptions]);

    // Group subscriptions by category
    const groupedSubscriptions = subscriptions.reduce(
        (groups, subscription) => {
            const categoryName =
                subscription.subscriptionCategory?.categoryName ||
                'Uncategorized';

            if (!groups[categoryName]) {
                groups[categoryName] = [];
            }

            groups[categoryName].push(subscription);

            return groups;
        },
        {}
    );

    return (
        <>
            <h1>My Subscriptions</h1>

            <p>
                <b>Total Monthly Cost:</b> {totalCost}
            </p>

            {Object.entries(groupedSubscriptions).map(
                ([categoryName, categorySubscriptions]) => (
                    <div key={categoryName}>
                        <h2>{categoryName}</h2>

                        <ul>
                            {categorySubscriptions.map(subscription => (
                                <li key={subscription.id}>
                                    <b>Company:</b>{' '}
                                    {subscription.companyName}{' '}

                                    <b>Cost:</b>{' '}
                                    {subscription.cost}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            )}
        </>
    );
}

export default SubscriptionList;
