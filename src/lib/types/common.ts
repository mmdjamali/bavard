export type NavbarRouteType = {
    title: string,
    disabled: true,
    icon: string,
    mobile: boolean
} | {
    title: string,
    disabled: false,
    path: string,
    icon: string,
    iconFill: string,
    mobile: boolean
}