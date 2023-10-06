export function convertCodeToValue(code, type) {
    const codes = {
        team_code: {
            0: '회장',
            1: '극본팀',
            2: '기획팀',
            3: '디자인팀',
            4: '배우팀',
            5: '연출팀',
            6: '음악팀',
            10: '전체',
            11: '개인',
        },
        point: {
            0: '출석',
            1: '사유지각/조퇴',
            2: '사유결석',
            3: '무단지각/조퇴',
            6: '무단결석',
            15: '무통보결석',
        },
        permission_code: {
            0: '관리자, 회장',
            1: '팀장',
            2: '팀원',
            3: '졸업자',
        }
    };
    
    return codes[type][code] || '알 수 없음';
}
