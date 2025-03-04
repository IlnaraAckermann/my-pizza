import { createLazyFileRoute } from "@tanstack/react-router";
import ErrorBoundary from "../ErrorBoundary";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ErrorBoundaryWrappedContactRoute,
});

function ErrorBoundaryWrappedContactRoute() {
  return (
    <ErrorBoundary>
      <ContactRoute />
    </ErrorBoundary>
  );
}

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      return postContact(Object.fromEntries(formData));
    },
  });

  return (
    <div className="contact">
      <h2>Contact</h2>
      {mutation.isSuccess ? (
        <p>Thanks for contacting us!</p>
      ) : (
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="Name" />
          <input name="email" type="email" placeholder="email@mail.com" />
          <textarea name="message" placeholder="Message" />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
}
