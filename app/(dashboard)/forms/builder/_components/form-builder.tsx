"use client";

import { Form } from "@prisma/client";
import React, { useEffect, useState } from "react";
import PublishFormBtn from "./publish-form-btn";
import SaveFormBtn from "./save-form-btn";
import PreviewDialogBtn from "./preview-dialog-btn";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import Confetti from "react-confetti";
import { SortableContext } from "@dnd-kit/sortable";
import Designer from "./designer";
import DragOverlayWrapper from "./drag-overlay-wrapper";
import { useDesigner } from "../_hooks/use-designer";
import { ImSpinner2 } from "react-icons/im";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import ShareLink from "../../_components/share-link";

type Props = {
  form: Form;
};

function FormBuilder({ form }: Props) {
  const { elements, setElements, setFormId } = useDesigner();
  const [isReady, setIsReady] = useState<boolean>(false);
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 10,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (isReady) return;
    try {
      const elements = JSON.parse(form.content);
      setElements(elements);
      setFormId(form.id)
    } catch (error) {
      console.log({error})
    }

    const readyTimeout = setTimeout(() => setIsReady(true), 500);
    return () => clearTimeout(readyTimeout);
  }, [form, isReady, setElements]);

  if (!isReady) {
    return (
      <div className="flex flex-col items-center justify-center h-full w-full">
        <ImSpinner2 className=" animate-spin h-12 w-12" />
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

  console.log({form})

  if (form.published) {
    return (
      <>
        <Confetti recycle={false} numberOfPieces={3000} width={window.innerWidth} height={window.innerHeight} />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="max-w-md">
            <h1 className="text-center text-4xl my-3 font-bold text-primary pb-2 mb-18">
              🎊🎊 Form Published 🎊🎊
            </h1>
            <h2 className="text-xl text-center">Share this form</h2>
            <h3 className="text-base font-semibold text-center text-muted-foreground pb-10 mt-2">
              Anyone with the link can view and submit the form
            </h3>
            <ShareLink shareUrl={shareUrl} />
            <div className="flex justify-between w-full">
              <Button variant={"link"} asChild>
                <Link href={"/forms"} className="gap-2">
                  <BsArrowLeft />
                  Go Back to Forms
                </Link>
              </Button>
              <Button variant={"link"} asChild>
                <Link href={`/forms/details/${form.id}`} className="gap-2">
                  Form Details
                  <BsArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <DndContext sensors={sensors}>
      <SortableContext items={elements}>
        <main className="flex flex-col w-full h-full">
          <nav className="flex justify-between border-b-2 p-4 gap-3 items-center">
            <h2 className="truncate font-medium">
              <span className="text-muted-foreground mr-2">Form:</span>
              {form.name}
            </h2>
            <div className="flex items-center gap-2">
              <PreviewDialogBtn />
              {!form.published && (
                <>
                  <SaveFormBtn id={form.id} />
                  <PublishFormBtn id={form.id} />
                </>
              )}
            </div>
          </nav>
          <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[200px] bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
            <Designer />
          </div>
        </main>
      </SortableContext>
      <DragOverlayWrapper />
    </DndContext>
  );
}

export default FormBuilder;
