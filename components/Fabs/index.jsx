"use client";
import {
  Tooltip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  // Image,
  Tabs,
  Tab,
  Card,
  CardBody,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";

import { MdChatBubble } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { BiPlus } from "react-icons/bi";

export default function Fabs() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";

  return (
    <div>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        scrollBehavior='inside'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Tranquil Essence
              </ModalHeader>
              <ModalBody className='px-0'>
                <div className='flex w-full flex-col'>
                  <Tabs
                    fullWidth
                    aria-label='Options'
                    radius='sm'
                    variant='solid'
                    size='lg'>
                    <Tab
                      key='staff'
                      title='Service/Staff'>
                      <Card
                        shadow='none'
                        className='px-0'>
                        <CardBody className='px-0'>
                          <Accordion
                            fullWidth
                            variant='light'
                            className='px-0 mx-0'>
                            <AccordionItem
                              className='px-2'
                              key='1'
                              aria-label='Accordion 1'
                              title='Accordion 1'
                              indicator={<IoIosArrowForward />}>
                              {defaultContent}
                            </AccordionItem>
                            <AccordionItem
                              className='px-2'
                              key='2'
                              aria-label='Accordion 2'
                              title='Accordion 2'
                              startContent={
                                <Button
                                  isIconOnly
                                  color='danger'
                                  aria-label='plus'
                                  className='rounded-full'
                                  variant='flat'
                                  size='sm'>
                                  <BiPlus />
                                </Button>
                              }>
                              {defaultContent}
                            </AccordionItem>
                            <AccordionItem
                              className='px-2'
                              key='3'
                              aria-label='Accordion 3'
                              title='Accordion 3'>
                              {defaultContent}
                            </AccordionItem>
                          </Accordion>
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab
                      key='date'
                      title='Date & Time'>
                      <Card shadow='none'>
                        <CardBody>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur.
                        </CardBody>
                      </Card>
                    </Tab>
                    <Tab
                      key='confirm'
                      title='Confirm'>
                      <Card shadow='none'>
                        <CardBody>
                          Excepteur sint occaecat cupidatat non proident, sunt
                          in culpa qui officia deserunt mollit anim id est
                          laborum.
                        </CardBody>
                      </Card>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  fullWidth
                  color='danger'
                  variant='light'
                  onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      <div className='fixed bottom-0 right-0 m-4'>
        <Tooltip
          // color='default'
          className='bg-[#d8ba6d74]'
          content='Book Your session today'
          showArrow={true}
          delay={40}
          placement='left'>
          <Button
            size='lg'
            isIconOnly
            className='bg-[#d8ba6d74] text-[#b99c51]'
            aria-label='Book'
            onPress={onOpen}
            variant='flat'>
            <MdChatBubble />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}
