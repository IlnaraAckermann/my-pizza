import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";
import { currencyFormatter } from "../untils/formatters";
import getPastOrders from "../api/getPastOrders";
import getPastOrder from "../api/getPastOrder";
import Modal from "../Modal";
import ErrorBoundary from "./../ErrorBoundary";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrdersRoute,
});

function ErrorBoundaryWrappedPastOrdersRoute() {
  return (
    <ErrorBoundary>
      <PastOrdersRoute />
    </ErrorBoundary>
  );
}

function PastOrdersRoute() {
  const [page, setPage] = useState(1);
  const [focusedOrder, setFocusedOrder] = useState(null);

  const { isLoading: isLoadingPastOrders, data: pastOrders } = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 30000,
  });

  const { isLoading: isLoadingPastOrder, data: pastOrder } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    enabled: !!focusedOrder,
    staleTime: 24 * 60 * 60 * 1000,
  });

  if (isLoadingPastOrders) {
    return (
      <div className="past-orders">
        <h2>LOADING …</h2>
      </div>
    );
  }

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {pastOrders.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <div>{page}</div>
        <button
          disabled={pastOrders.length < 10}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
      {focusedOrder && (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrder.orderItems.map((pizza) => (
                  <tr key={`${pizza.id}-${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt={pizza.name} />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{currencyFormatter(pizza.price)}</td>
                    <td>{currencyFormatter(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p> Loading</p>
          )}
          <button onClick={() => setFocusedOrder(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
}
