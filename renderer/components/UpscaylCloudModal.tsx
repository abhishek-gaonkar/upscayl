import { useState } from "react";
import { waitlistCollection } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useTranslations } from "next-intl";

const nameRegex = /^[A-Za-z\s.'-]+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const UpscaylCloudModal = ({ show, setShow, setDontShowCloudModal }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const t_app = useTranslations("App");
  const t_infos = useTranslations("App.Upscayl_Cloud");

  return (
    <dialog className={`modal ${show && "modal-open"}`}>
      <div className="modal-box flex flex-col items-center gap-4 text-center">
        <button
          className="btn btn-circle absolute right-4 top-2"
          onClick={() => setShow(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <rect
              x="0"
              y="0"
              width="24"
              height="24"
              fill="none"
              stroke="none"
            />
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-width="1.5"
              d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"
            />
          </svg>
        </button>
        <p className="badge badge-neutral text-xs">{t_infos("COMING_SOON")}</p>
        <p className="text-2xl font-semibold">{t_app("Intro")}</p>
        <p className="w-9/12 text-lg font-medium">
          {t_infos("CATCHY_PHRASE_1")}
        </p>

        <div className="flex flex-col gap-2 text-start">
          <p>🌐 Upscayl anywhere, anytime, any device</p>
          <p>☁️ No Graphics Card or hardware required</p>
          <p>👩 Face Enhancement</p>
          <p>🦋 10+ models to choose from</p>
          <p>🏎 5x faster than Upscayl Desktop</p>
          <p>🎞 Video Upscaling</p>
          <p>💰 Commercial Usage</p>
          <p>😴 Upscayl while you sleep</p>
        </div>

        <form
          className="flex flex-col items-center gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              name &&
              email &&
              nameRegex.test(name) &&
              emailRegex.test(email)
            ) {
              try {
                await setDoc(doc(waitlistCollection, email), {
                  name,
                  email,
                });
              } catch (error) {
                alert(
                  `Thank you ${name}! It seems that your email has already been registered :D If that's not the case, please try again.`,
                );
                return;
              }
              setName("");
              setEmail("");
              setDontShowCloudModal(true);
              setShow(false);
              alert(
                "Thank you for joining the waitlist! We will notify you when Upscayl Cloud is ready for you.",
              );
            } else {
              alert("Please fill in all the fields correctly.");
            }
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="input input-bordered"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input input-bordered"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="rounded-2xl bg-success px-4 py-2 text-success-content"
          >
            Join the waitlist
          </button>

          <button
            className="text-xs text-base-content/50"
            onClick={() => {
              setDontShowCloudModal(true);
              setShow(false);
            }}
            type="button"
          >
            DON'T SHOW AGAIN
          </button>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setShow(false)}>close</button>
      </form>
    </dialog>
  );
};
