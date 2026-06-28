import { Toast } from "@maracatu/estandarte";
import { MotionGlobalConfig } from "motion/react";

// The static capture screenshots before motion's enter animation finishes, so
// land all animations at their final state. MotionGlobalConfig comes from the
// bundle's deduped motion (merged via cfg.extraEntries), so this reaches the
// same instance Toast uses.
MotionGlobalConfig.skipAnimations = true;

// Toast positions itself with `position: fixed`; a `transform` on the stage
// makes that fixed box resolve to the stage so it's captured inside the cell.
// The stage uses the brand canvas token.
const Stage = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{ transform: "translateZ(0)", position: "relative", height: 96, width: 480 }}
    className="bg-canvas rounded-card overflow-hidden"
  >
    {children}
  </div>
);

export const Success = () => (
  <Stage>
    <Toast message="Salvo com sucesso" kind="success" />
  </Stage>
);

export const ErrorVariant = () => (
  <Stage>
    <Toast message="Não foi possível salvar. Tente novamente." kind="error" />
  </Stage>
);
