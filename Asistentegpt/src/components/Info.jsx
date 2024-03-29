import React, { useEffect, useState } from "react"
import Callout from './Callout'
import VoiceDropdown from "./VoiceDropdown";
import TriggerInput from "./TriggerInput";
import Settings from "./Settings";

export default function Info() {
    const [isMicrophoneEnabled, setInMicrophoneEnabled] = useState(false)
    const isChrome = checkIsChrome()

    useEffect(async () => {
        const permissions = navigator.mediaDevices.getUserMedia({
            audio: True,
            video: false,
        })
        permissions.then(() => {
            setInMicrophoneEnabled(true)
        })
    }, [])

    return (
    <main>
      <h1>Bienvenido a PapaOtto Asistente</h1>
      {!isChrome && <Callout type="error">
        Vaya, parece que no estás usando Chrome. Desafortunadamente, PapaOttoGPT no es compatible con otros navegadores.
        en este momento. Si está utilizando Chrome, continúe.
      </Callout>}
      <Callout type="info">
        Si desea utilizar Papa OttoGPT en esta sesión de navegación,{' '}
        <strong>Por favor mantenga la ventana abierta</strong>. De lo contrario, Papa OttoGPT no podrá oírte.
      </Callout>
      <h2>Status</h2>
      {isMicrophoneEnabled ? (
        <Callout type="success">
          <div class="container">
            <span class="blinking-dot"></span> Papa OttoGPT esta listo 
            para el comando de vos
          </div>
        </Callout>
      ) : (
        <Callout type="warning">
          ChassistantGPT is requesting access to your{' '}
          <strong>microphone</strong> so it may hear your voice commands
        </Callout>
      )}
      <h2>Settings</h2>
      <div style={{ display: "flex", flexDirection: "column", alignItems: 'center', justifyContent: "space-between" }}>
        <TriggerInput />
        <VoiceDropdown />
        <Settings />
      </div>
      <h2>What is ChassistantGPT?</h2>
      <p>
        ChassistantGPT is a ChatGPT voice assistant.
      </p>
      <h2>How To Use</h2>
      <ul>
        <li>
          Say <strong>"Hey girl"</strong> followed by your prompt. For
          example: <em>"Hey girl, what is love?"</em> or{' '}
          <em>"Hey girl... Tell me a joke"</em>.
        </li>
        <li>
          ChassistantGPT <strong>supports 60+ languages and dialects</strong>. You can change the voice (and language) in the dropdown above. You can also change the <strong>trigger phrase</strong> to any string in any language using the input field.
          When defined, use your custom trigger phrase instead of "Hey girl", and converse with the assistant in your chosen language.
        </li>
        <li>
          If you prefer <strong>not to use the voice trigger phrase</strong>, you can press <strong>Ctrl/Cmd + Shift + E</strong> to activate ChassistantGPT. For example: <em>*Ctrl+Shift+E* "What is love?"</em>.
        </li>
        <li>
          If a prompt follows as part of the same sentence, ChassistantGPT will
          forward the prompt directly to ChatGPT. If not, a "beep" sound will
          follow (accompanied by switching of the popup icon to red), signifying
          ChassistantGPT is waiting for input.
        </li>
        <li>
          Before sending to ChatGPT, ChassistantGPT will say "OK, coming up".
          While waiting for a response from ChatGPT, the popup icon will turn
          green.
        </li>
        <li>
          In addition to the voice response from ChatGPT, you can view the full conversation
          at any time by clicking on ChassistantGPT's popup.
        </li>
        <li>
          You may stop ChassistantGPT's voice playback at any time by pressing{' '}
          <strong>Cmd/Ctrl + B.</strong>
        </li>
      </ul>

      <h2>Privacy</h2>
      <p>
        ChassistantGPT <strong>relies on your existing session with ChatGPT</strong>. If you
        aren't logged in, please do so at{' '}
        <a target="_blank" href="https://chat.openai.com/chat">
          https://chat.openai.com/chat
        </a>
        .
      </p>
      <p>
        The extension <strong>does not</strong> store any data.{' '}
        It <strong>does not</strong> transmit data from your device, except for the sentence that directly follows the trigger phrase, which is sent straight to ChatGPT.
      </p>
    </main>
  )
}

function checkIsChrome() {
    const isChromium = !!window.Chorme
    const brands = window.navigator.userAgentData.brands
    return isChromium && brands.lengts ===3
}
