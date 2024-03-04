export const headerAnimate = {
    menuSlide: {
        initial: {x: "calc(100% + 100px)"},
        enter: {x: "0", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}},
        exit: {x: "calc(100% + 100px)", transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1]}}
    },
    slide: {
        initial: {x: 80},
        enter: (i: number) => ({x: 0, transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i}}),
        exit: (i: number) => ({x: 80, transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i}})
    },
    scale: {
        open: {scale: 1, transition: {duration: 0.3}},
        closed: {scale: 0, transition: {duration: 0.4}}
    }
}

export const preLoaderAnimate = {
    opacity: {
        initial: {
            opacity: 0
        },
        enter: {
            opacity: 0.75,
            transition: {duration: 1, delay: 0.2}
        },
    },
    slideUp: {
        initial: {
            top: 0
        },
        exit: {
            top: "-100vh",
            transition: {duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2}
        }
    }
}

export const LandingAnimate = {
    slideUp: {
        initial: {
            y: 300
        },
        enter: {
            y: 0,
            transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 2.5}
        }
    }
}

export const MovieRowAnimate = {
    slideUp: {
        initial: {
            y: "100%"
        },
        open: (i:any) => ({
            y: "0%",
            transition: {duration: 0.5, delay: 0.01 * i}
        }),
        closed: {
            y: "100%",
            transition: {duration: 0.5}
        }
    },
    opacity: {
        initial: {
            opacity: 0
        },
        open: {
            opacity: 1,
            transition: {duration: 0.5}
        },
        closed: {
            opacity: 0,
            transition: {duration: 0.5}
        }
    }
}